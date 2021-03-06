/**********************
 User Preferences
**********************/
function Prefs() {
    var form_object = loadPrefsForForm();

    for (var prop in form_object) {
        if (form_object[prop] == 'true')
            this[prop] = true;
        else if (form_object[prop] == 'false')
            this[prop] = false;
        else
            this[prop] = form_object[prop];
    }

    //NOTE the this.* fields have to match the names in the HTML.
}

function getUserPrefs(force_reload) {

    if (USER_PREFS == null || force_reload) {
        Logger.log('User preferences object empty.. reloading..');
        USER_PREFS = new Prefs();

    }
    return USER_PREFS;
}

function savePrefsFromForm(form_object) {
    Logger.log('Saving preferences from form object which contains: ');

    for (var prop in form_object)
        Logger.log(' - ' + prop + ' => ' + form_object[prop]);

    UserProperties.setProperties(form_object, true);

    var prefs = getUserPrefs(true);

    Logger.log('Refreshed preference object now contains:');

    return 'Saved new preferences.';
}

function loadPrefsForForm() {       
    prefs = UserProperties.getProperties();

    var timerLabels = getSugars(SCHEDULEIT_NORESPONSE_LABEL);

    Logger.log('loadPrefsForForm-timerLabels: ' + timerLabels);

    if (timerLabels.length) {
        prefs['timer'] = JSON.stringify(timerLabels);
    }

    //var noResponseTimerLabels = getSugars(SCHEDULEIT_NORESPONSE_LABEL);

    //if (noResponseTimerLabels.length) {
    //    prefs['noResponseTimers'] = noResponseTimerLabels;
    //}

    //var snoozeTimerLabels = getSugars(SCHEDULEIT_SNOOZE_LABEL);

    //if (snoozeTimerLabels.length) {
    //    prefs['snoozeTimers'] = snoozeTimerLabels;
    //}

    //var purgeTimerLabels = getSugars(SCHEDULEIT_PURGE_LABEL);

    //if (purgeTimerLabels.length) {
    //    prefs['purgeTimers'] = purgeTimerLabels;
    //}

    //var sendLaterTimerLabels = getSugars(SCHEDULEIT_SENDLATER_LABEL).remove(new RegExp(SCHEDULEIT_RECURRING_LABEL, "i"));

    //if (sendLaterTimerLabels.length) {
    //    prefs['sendLaterTimers'] = sendLaterTimerLabels;
    //}

    for (default_prop in DEFAULT_PREFS) {
        if (prefs[default_prop] == undefined) {
            prefs[default_prop] = DEFAULT_PREFS[default_prop];

            Logger.log('Loading default property for key:' + default_prop + ' value: ' + prefs[default_prop]);
        }
    }

    return prefs
}

function clearPreferences(form_object) {
    UserProperties.deleteAllProperties();

    //TODO Can I refresh page automatically?
    return 'Defaults restored. Please refresh page.';
}

/**
 * Determine if preference property exists
 * @param {any} id
 */
function preferenceExists(id) {
    return !!PropertiesService.getScriptProperties().getProperty(id);
}

function setTimeZone(timezone) {
    prefs = UserProperties.getProperties();
    prefs['localzone'] = timezone;

    return true;
}