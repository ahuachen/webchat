import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';
import 'core-js/es/object';
import defaultWebchatSettings from './default-webchat-settings';
import {merge, addCssToPage} from './mixins/bootstrapFunctions';

/**
 * Merges window.openDialogSettings with the settings from the database.
 * Anything set in window.openDialogSettings will take preference over anything from the database
 *
 * @param webchatSettings
 */

function openChatWindow() {
    document.body.classList.add('chatbot-no-scroll');

    // Send settings to the chat widget.
    window.postMessage({
        openDialogSettings: window.openDialogSettings,
        loadSettings: window.openDialogSettings,
        newPathname: window.location.pathname,
    }, '*');

    if (window.openDialogSettings.general.chatbotCssPath) {
        addCssToPage(window.openDialogSettings.general.chatbotCssPath);
    }

    window.addEventListener('message', (event) => {

        if (event.data && typeof event.data.height !== 'undefined') {
            window.style.height = (event.data.height === 'auto') ? '' : event.data.height;

            if (event.data.height === 'auto') {
                document.body.classList.add('chatbot-no-scroll');
            } else {
                document.body.classList.remove('chatbot-no-scroll');
            }
        }

        if (event.data && typeof event.data.addClass !== 'undefined') {
            window.classList.add(event.data.addClass);
        }

        if (event.data && typeof event.data.removeClass !== 'undefined') {
            window.classList.remove(event.data.removeClass);
        }

        if (event.data && typeof event.data.dataLayerEvent !== 'undefined') {
            if (window.dataLayer !== undefined) {
                window.dataLayer.push({ event: event.data.dataLayerEvent });
            }
        }
    });
}

/**
 * Gets the webchat settings from the database
 * @returns {Promise<any>}
 */
async function getSettings(url) {
    const response = await fetch(`${url}/webchat-config`);
    const json = await response.json();
    return json;
}

if (window.openDialogSettings) {
    const { url } = window.openDialogSettings;
    merge(defaultWebchatSettings, window.openDialogSettings);

    getSettings(url).then((settings) => {
        merge(window.openDialogSettings, settings);

        if (window.openDialogSettings.general.chatbotFullpageCssPath) {
            addCssToPage(window.openDialogSettings.general.chatbotFullpageCssPath);
        }

        openChatWindow();
    });
}
