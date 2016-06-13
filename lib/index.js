'use strict';
const lang = require('zero-lang');
const globalVar = lang.global;
const vsprintf = require('sprintf-js').vsprintf;

const LOCALE = 'en_US';
const defaultLocale = globalVar.ZERO_DEFAULT_LOCALE || LOCALE;
const cachedMessages = {};

let currentLocale = globalVar.ZERO_LOCALE || LOCALE;

function initLocaleMessages(locale) {
  cachedMessages[locale] = lang.extend({}, cachedMessages[locale] || {});
}

const i18n = {
  setLocale(locale) {
    currentLocale = lang.lc(locale || defaultLocale);
    return i18n;
  },

  set(messageId, msgStr, locale) {
    // set message
    locale = lang.lc(locale || currentLocale);
    initLocaleMessages(locale);
    cachedMessages[locale][messageId] = msgStr;
    return i18n;
  },

  load(messages, locale) {
    // load messages
    messages = messages || {};
    locale = lang.lc(locale || currentLocale);
    initLocaleMessages(locale);
    lang.extend(cachedMessages[locale], messages);
    return i18n;
  },

  get(messageId, locale) {
    // get messageStr
    locale = lang.lc(locale || currentLocale);
    initLocaleMessages(locale);
    if (cachedMessages[locale][messageId]) {
      return cachedMessages[locale][messageId];
    }
    if (cachedMessages[defaultLocale][messageId]) {
      return cachedMessages[defaultLocale][messageId];
    }
    return messageId;
  },

  translate(/* messageId, ...args */) {
    const args = lang.toArray(arguments);
    const messageId = args.shift();
    return vsprintf(i18n.get(messageId, currentLocale), args);
  }
};

module.exports = i18n;
