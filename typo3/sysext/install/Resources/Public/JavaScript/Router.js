/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
define(["require","exports","jquery","./Renderable/InfoBox","./Renderable/Severity","./Renderable/ProgressBar","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Backend/Icons"],(function(e,t,o,a,s,n,l,i){"use strict";return new class{constructor(){this.selectorBody=".t3js-body",this.selectorMainContent=".t3js-module-body"}initialize(){this.registerInstallToolRoutes(),o(document).on("click",".t3js-login-lockInstallTool",e=>{e.preventDefault(),this.logout()}),o(document).on("click",".t3js-login-login",e=>{e.preventDefault(),this.login()}),o(document).on("keydown","#t3-install-form-password",e=>{13===e.keyCode&&(e.preventDefault(),o(".t3js-login-login").click())}),o(document).on("click",".card .btn",t=>{t.preventDefault();const a=o(t.currentTarget),s=a.data("require"),n=a.data("inline");if(void 0!==n&&1===parseInt(n,10))e([s],e=>{e.initialize(a)});else{const t=a.closest(".card").find(".card-title").html(),n=a.data("modalSize")||l.sizes.large;i.getIcon("spinner-circle",i.sizes.default,null,null,i.markupIdentifiers.inline).done(a=>{const i={type:l.types.default,title:t,size:n,content:o('<div class="modal-loading">').append(a),additionalCssClasses:["install-tool-modal"],callback:t=>{e([s],e=>{e.initialize(t)})}};l.advanced(i)})}}),"backend"===o(this.selectorBody).data("context")?this.executeSilentConfigurationUpdate():this.preAccessCheck()}registerInstallToolRoutes(){void 0===TYPO3.settings&&(TYPO3.settings={ajaxUrls:{icons:"?install[controller]=icon&install[action]=getIcon",icons_cache:"?install[controller]=icon&install[action]=getCacheIdentifier"}})}getUrl(e,t){const a=o(this.selectorBody).data("context");let s=location.href;return s=s.replace(location.search,""),void 0===t&&(t=o(this.selectorBody).data("controller")),s=s+"?install[controller]="+t,void 0!==a&&""!==a&&(s=s+"&install[context]="+a),void 0!==e&&(s=s+"&install[action]="+e),s}executeSilentConfigurationUpdate(){this.updateLoadingInfo("Checking session and executing silent configuration update"),o.ajax({url:this.getUrl("executeSilentConfigurationUpdate","layout"),cache:!1,success:e=>{!0===e.success?this.executeSilentExtensionConfigurationSynchronization():this.executeSilentConfigurationUpdate()},error:e=>{this.handleAjaxError(e)}})}executeSilentExtensionConfigurationSynchronization(){const e=o(this.selectorBody);this.updateLoadingInfo("Executing silent extension configuration synchronization"),o.ajax({url:this.getUrl("executeSilentExtensionConfigurationSynchronization","layout"),cache:!1,success:t=>{if(!0===t.success)this.loadMainLayout();else{const t=a.render(s.error,"Something went wrong","");e.empty().append(t)}},error:e=>{this.handleAjaxError(e)}})}loadMainLayout(){const e=o(this.selectorBody);this.updateLoadingInfo("Loading main layout"),o.ajax({url:this.getUrl("mainLayout","layout"),cache:!1,success:t=>{if(!0===t.success&&"undefined"!==t.html&&t.html.length>0){if(e.empty().append(t.html),"backend"!==o(this.selectorBody).data("context")){const t=e.data("controller");e.find('.t3js-mainmodule[data-controller="'+t+'"]').addClass("active")}this.loadCards()}else{const t=a.render(s.error,"Something went wrong","");e.empty().append(t)}},error:e=>{this.handleAjaxError(e)}})}handleAjaxError(e,t){let n;if(403===e.status){"backend"===o(this.selectorBody).data("context")?(n=a.render(s.error,"The install tool session expired. Please reload the backend and try again."),o(this.selectorBody).empty().append(n)):this.checkEnableInstallToolFile()}else{const a=this.getUrl(void 0,"upgrade");n=o('<div class="t3js-infobox callout callout-sm callout-danger"><div class="callout-body"><p>Something went wrong. Please use <b><a href="'+a+'">Check for broken extensions</a></b> to see if a loaded extension breaks this part of the install tool and unload it.</p><p>The box below may additionally reveal further details on what went wrong depending on your debug settings. It may help to temporarily switch to debug mode using <b>Settings > Configuration Presets > Debug settings.</b></p><p>If this error happens at an early state and no full exception back trace is shown, it may also help to manually increase debugging output in <code>typo3conf/LocalConfiguration.php</code>:<code>[\'BE\'][\'debug\'] => true</code>, <code>[\'SYS\'][\'devIPmask\'] => \'*\'</code>, <code>[\'SYS\'][\'displayErrors\'] => 1</code>,<code>[\'SYS\'][\'exceptionalErrors\'] => 12290</code></p></div></div><div class="panel-group" role="tablist" aria-multiselectable="true"><div class="panel panel-default panel-flat searchhit"><div class="panel-heading" role="tab" id="heading-error"><h3 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse-error" aria-expanded="true" aria-controls="collapse-error" class="collapsed"><span class="caret"></span><strong>Ajax error</strong></a></h3></div><div id="collapse-error" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading-error"><div class="panel-body">'+e.responseText+"</div></div></div></div>"),void 0!==t?o(t).empty().html(n):o(this.selectorBody).empty().html(n)}}checkEnableInstallToolFile(){o.ajax({url:this.getUrl("checkEnableInstallToolFile"),cache:!1,success:e=>{!0===e.success?this.checkLogin():this.showEnableInstallTool()},error:e=>{this.handleAjaxError(e)}})}showEnableInstallTool(){o.ajax({url:this.getUrl("showEnableInstallToolFile"),cache:!1,success:e=>{!0===e.success&&o(this.selectorBody).empty().append(e.html)},error:e=>{this.handleAjaxError(e)}})}checkLogin(){o.ajax({url:this.getUrl("checkLogin"),cache:!1,success:e=>{!0===e.success?this.loadMainLayout():this.showLogin()},error:e=>{this.handleAjaxError(e)}})}showLogin(){o.ajax({url:this.getUrl("showLogin"),cache:!1,success:e=>{!0===e.success&&o(this.selectorBody).empty().append(e.html)},error:e=>{this.handleAjaxError(e)}})}login(){const e=o(".t3js-login-output"),t=n.render(s.loading,"Loading...","");e.empty().html(t),o.ajax({url:this.getUrl(),cache:!1,method:"POST",data:{install:{action:"login",token:o("[data-login-token]").data("login-token"),password:o(".t3-install-form-input-text").val()}},success:t=>{!0===t.success?this.executeSilentConfigurationUpdate():t.status.forEach(t=>{const o=a.render(t.severity,t.title,t.message);e.empty().html(o)})},error:e=>{this.handleAjaxError(e)}})}logout(){o.ajax({url:this.getUrl("logout"),cache:!1,success:e=>{!0===e.success&&this.showEnableInstallTool()},error:e=>{this.handleAjaxError(e)}})}loadCards(){const e=o(this.selectorMainContent);o.ajax({url:this.getUrl("cards"),cache:!1,success:t=>{if(!0===t.success&&"undefined"!==t.html&&t.html.length>0)e.empty().append(t.html);else{const t=a.render(s.error,"Something went wrong","");e.empty().append(t)}},error:e=>{this.handleAjaxError(e)}})}updateLoadingInfo(e){o(this.selectorBody).find("#t3js-ui-block-detail").text(e)}preAccessCheck(){this.updateLoadingInfo("Execute pre access check"),o.ajax({url:this.getUrl("preAccessCheck","layout"),cache:!1,success:e=>{e.installToolLocked?this.checkEnableInstallToolFile():e.isAuthorized?this.executeSilentConfigurationUpdate():this.showLogin()},error:e=>{this.handleAjaxError(e)}})}}}));