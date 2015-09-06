define(function(require, exports, module){
	var Selector = require('./p.event_selector');
	var tpl =require('./tpls/text_kindeditor.tpl');

	function Editor(opt){
		this.cfg = $.extend({
			content:$('body'),
			data:{},
			maxLength:600,
			width:'90%',
			height:"120px",
			types:{},
			onSave:function(){}
		},opt);


		this.box = null;
		this.tpls = Handlebars.compile(tpl);
		this.editor = null;

		this.init();
	}

	Editor.prototype = {
		render:function(){
			var that = this,
				html = this.tpls(this.cfg.data);

			this.box = $(html);
			this.cfg.content.append(this.box);
		},
		initData:function(){
			this.cfg.data.maxLength = this.cfg.maxLength;
			this.cfg.data.width = this.cfg.width;
			this.cfg.data.height = this.cfg.height;
		},

		bind:function(){
			var that = this,valid;


		    this.editor = KindEditor.create(that.box.find('textarea[name=content]'), {
		        height:that.cfg.height,
		        width:that.cfg.width,
		        themeType: 'simple',
		        htmlTags: {
		            a : ['href', 'target'],
		            'br': []
		        },
		        resizeType: 1,
		        dialogAlignType: '',
		        items: ['link_event'],// 'emoticons',
		        designMode: true,
		        pasteType: 1,
		        newlineTag: 'br',
		        indentChar: '  ',
		        afterChange : function() {
		            this.sync();
		            var n = that.cfg.maxLength - this.count('text');
		            if(n >= 0) {
		                that.box.find('.word-count').show();
		                that.box.find('.word-count2').hide();
		                that.box.find('.word-limit').html(n);
		            }
		            else {
		                that.box.find('.word-count').hide();
		                that.box.find('.word-count2').show();
		                that.box.find('.word-limit2').html(-n);
		            }
		        },
		        afterCreate:function(){
		        	valid = that.box.validate({
		        		ignore:[],
		        		rules:{
		        			content:{
		        				required:true
		        			}
		        		}
		        	})
		        },
		        afterBlur:function(){
		        	that.editor.sync();
		        	valid.form();
		        }
		    });

			$(document).on('click', '.J_keSelEvent', (function(){
			    var sel;
			    return function(){
			      var $this = $(this);
			      if (sel) sel.show();
			      else {
			        sel = new Selector({
			          data: {
			            types: that.cfg.types
			          },
			          onSave: function(data){
			            if (data) {
			              var $btn = $('.ke-dialog .J_keSelEvent');
			              $btn.text(data.name);
			              $('#keText').val(data.name);
			              $('#keUrl').val(data.url);
			            }
			          }
			        });
			      }
			    };
		  	})());

			this.box.on('click', '.J_saveBtn', function(){
		  		if(that.box.find('.word-count2').is(':hidden') && valid.form()){
		  			var data = that.serialize();
					that.cfg.onSave && that.cfg.onSave(data);
		  		}

		  	});
		},

		serialize:function(){
			this.editor.sync();
			var form = this.box,
				that = this,
				data = {
					msg_info_type:form.find('[name=msg_info_type]').val(),
					msg_type:form.find('[name=msg_type]').val(),
					id:form.find('[name=id]').val(),
					content:form.find('[name=content]').val(),
					shop_id:that.cfg.data.shop_id
				};
			return data;
		},

		style:function(){

		},
		init:function(){
			this.initData();
			this.render();
			this.bind();
		},
		destory:function(){}

	}

	module.exports = Editor;

})