// ==UserScript==
// @name         login upon select
// @namespace    https://www.robenheimer.dev
// @version      2024-02-07
// @description  log in to aws saml after selecting account
// @author       robenheimer
// @match        https://signin.aws.amazon.com/saml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @require      https://signin.aws.amazon.com/static/js/jquery.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

class LS {
  constructor(localStorage, ...keys) {
    keys.forEach(k => {
      Object.defineProperty(this, k, {
        get: () => GM_getValue(k),
        set: (v) => GM_setValue(k, v)
      });
    });

    Object.freeze(this);
  }
}

const ls = new LS(
  GM_getValue,
  GM_setValue,
  'defaultAccount',
  'autoLogin'
);

jQuery('[id].saml-account')
  .css('display', 'inline-block')
  .after(
    jQuery(`
      <div style="display:inline-block">
        <input class=autologin type=checkbox checked=${ls.autoLogin} />
        <label>auto?</label>
      </div>
    `).on('click', (e) => {
      const newVal = jQuery(e.currentTarget).find('input').prop('checked');

      jQuery('.autologin').prop('checked', newVal);
      ls.autoLogin = newVal;
    }));

jQuery('.saml-radio')
  .on('change', e => {
    ls.defaultAccount = e.currentTarget.value;

    if (ls.autoLogin) {
      console.log(e);
      jQuery("#saml_form").submit();
    }
  });

jQuery(`[id="${ls.defaultAccount}"]`).click();
