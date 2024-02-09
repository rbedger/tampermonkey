// ==UserScript==
// @name         go/aws auto-login
// @namespace    https://www.robenheimer.dev
// @downloadURL  https://raw.githubusercontent.com/rbedger/tampermonkey/main/scripts/awsSamlLogin.js
// @version      2024-02-09
// @description  auto-populate the most frequently-used aws account.  optionally, auto-proceed with log in
// @author       robenheimer
// @match        https://signin.aws.amazon.com/saml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @require      https://signin.aws.amazon.com/static/js/jquery.min.js
// @require      https://raw.githubusercontent.com/rbedger/tampermonkey/main/scripts/util.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

const $ = window.jQuery;
const ls = new WellDefinedStorage(
  {
    get: GM_getValue,
    set: GM_setValue,
  },
  'defaultAccount',
  'autoLogin'
);


$('[id].saml-account')
  .css('display', 'inline-block')
  .after(
    $(`
      <div style="display:inline-block">
        <input class=autologin type=checkbox checked=${ls.autoLogin} />
        <label>auto?</label>
      </div>
    `).on('click', (e) => {
      const newVal = $(e.currentTarget).find('input').prop('checked');

      $('.autologin').prop('checked', newVal);
      ls.autoLogin = newVal;
    }));

$('.saml-radio')
  .on('change', e => {
    ls.defaultAccount = e.currentTarget.value;

    if (ls.autoLogin) {
      $("#saml_form").submit();
    }
  });

$(`[id="${ls.defaultAccount}"]`).click();
