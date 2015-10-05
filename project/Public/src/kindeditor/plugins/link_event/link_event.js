/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('link_event', function(K) {
	var self = this, name = 'link_event',
			origName = 'link';
	self.plugin.link_event = {
		edit : function() {
			var lang = self.lang(origName + '.'),
				html = '<div style="padding:20px;" class="Form-vertical">' +
					//url
					'<div class="ke-dialog-row Form-controls"><label><input type="radio" name="modus" id="" checked> 链接</label><label><input type="radio" name="modus" id=""> 活动</label></div>' +
					'<div class="ke-dialog-toggle">' +
					'<div class="ke-dialog-row Form-controls">' +
					//'<label for="keUrl" style="width:60px;">' + lang.url + '</label>' +
					'<input type="hidden" id="keText" name="text" value="" class="linked-text" />' +
					'<input type="url" id="keUrl" name="url" value="" class="linked-url" placeholder="http://" style="width:260px;" /></div>' +
					//type
					'<div class="ke-dialog-row" style="display:none;">' +
					'<label for="keType" style="width:60px;">' + lang.linkType + '</label>' +
					'<select id="keType" name="type"></select>' +
					'</div>' +
					'</div>' +
					'<div class="ke-dialog-toggle" style="display:none"><button type="button" class="btn J_keSelEvent"><span>选择活动</span></button></div>' +
					'</div>',
				dialog = self.createDialog({
					name : origName,
					width : 450,
					height: 'auto',
					z: 100,
					title : self.lang(origName),
					body : html,
			    	autoScroll: false,
					yesBtn : {
						name : self.lang('yes'),
						click : function(e) {
							var url = K.trim(urlBox.val());
							if (url == 'http://' || K.invalidUrl(url)) {
								alert(self.lang('invalidUrl'));
								urlBox[0].focus();
								return;
							}
							self.exec('createlink', url, typeBox.val(), textBox.val()).hideDialog().focus();
						}
					}
				}),
				div = dialog.div,
				modusEl = K('input[name="modus"]', div),
				textBox = K('input[name="text"]', div),
				urlBox = K('input[name="url"]', div),
				typeBox = K('select[name="type"]', div);
			// urlBox.val('http://');
			typeBox[0].options[0] = new Option(lang.selfWindow, '');
			typeBox[0].options[1] = new Option(lang.newWindow, '_blank');
			self.cmd.selection();
			modusEl.change(function(e) {
				if(this.checked) {
					K('.ke-dialog-toggle', div).hide().eq(K(this).parent().index()).show();
				}
			});
			var a = self.plugin.getSelectedLink();
			if (a) {
				self.cmd.range.selectNode(a[0]);
				self.cmd.select();
				urlBox.val(a.attr('data-ke-src'));
				typeBox.val(a.attr('target'));
				var text = a.html();
				if (text) K('.J_keSelEvent', div).html(text);
			}
			urlBox[0].focus();
			urlBox[0].select();
		},
		'delete' : function() {
			self.exec('unlink', null);
		}
	};
	self.clickToolbar(name, self.plugin.link_event.edit);
});