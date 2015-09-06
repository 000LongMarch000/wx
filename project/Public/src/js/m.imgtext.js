define(function(require, exports, module){
	var tpl = $(require('./tpls/img_text.tpl'));
	var Selector = require('./p.event_selector');

	require('./m.uploadify')($);
	require('./m.confirm')($);

	function ImgText(opt){
		
		this.cfg = $.extend({
			onSave:function(){},  //保存回调
			data:null,  //默认带入的数据        
			content:$('body'),  //保存的元素
			key: new Date().getTime(),  //控件的名称，防止多个空间id冲突
			index:1,
			maxlength:8  //最多添加的图文数
		}, opt);

		this.tpl = {
			content:Handlebars.compile(tpl.filter('#J_tplImgText').html()),
			edit:Handlebars.compile(tpl.filter('#J_tplImgTextEdit').html())
		}
		this.box = null;  //对控件的引用
		this.handlers ={};

		Handlebars.registerPartial("editContent", tpl.filter('#J_tplImgTextEdit').html());

		this.init();
	};

	ImgText.prototype = {

		on:function(type, handler){
			(this.handlers[type] || (this.handlers[type] = [])).push(handler);
		},

		fire:function(type, data){
			var handlers = this.handlers[type];

			if(Object.prototype.toString.call(handlers) == '[object Array]' ){
				$.each(handlers, function(index, value){
					value(data);
				})
			}
		},

		style:function(){},
		
		bind:function(){
			var that = this,
				form = $('#'+this.cfg.key+'-form'), 
				valid;

			if(this.cfg.onSave) this.on('save', this.cfg.onSave);

			this.box.on('mouseenter', '.preview-list li', function(){
				$(this).find('.list-action').show();

			}).on('mouseleave', '.preview-list li', function(){
				$(this).find('.list-action').hide();

			}).on('mouseenter', '.preview-cover', function(){
				$(this).find('.cover-action').show();

			}).on('mouseleave', '.preview-cover', function(){
				$(this).find('.cover-action').hide();

			}).on('click', '.add-btn', function(){
				if(!$(this).hasClass('disabled')){
					that.add();
				}
				
			}).on('mouseenter', '.add-btn.disabled', function(){
				that.box.find('.maxlength-error').css('visibility', 'visible');

			}).on('mouseleave', '.add-btn.disabled', function(){
				that.box.find('.maxlength-error').css('visibility', 'hidden');

			}).on('click', '.action-del', function(){
				that.del($(this));

			}).on('click', 'li .action-edit', function(){
				var li = $(this).parents('li');

				that.box.find('.preview-bd .current').removeClass('current');
				li.addClass('current');
				that.edit(li.attr('id').split('-')[2]);

			}).on('click', '.cover-action a', function(){
				that.box.find('.preview-bd .current').removeClass('current');
				$(this).parents('.preview-cover').addClass('current')
				that.edit($(this).attr('id').split('-')[2]);

			}).on('change', 'input[type=radio]', function(){
				var options = $(this).closest('li').find('.check-option'),
					val = $(this).val();

				options.removeClass('show').eq(val-1).addClass('show');

			}).on('keyup', 'input[name^=title-]', function(){
				var	id = $(this).attr('name').split('-')[1],
					title = $('#'+that.cfg.key + '-preview-'+id).find('h3');

				title.text($(this).val());

			}).on('click', '#'+that.cfg.key+'-saveBtn',function(){
				var data ;

				if(valid.form()){
					data = that.serialize();
					that.fire('save', data)
				}else{
					var id = $(_.last(valid.errorList).element).closest('ul').attr('id').split('-')[2];

					$('#'+that.cfg.key+'-preview-'+id).find('.action-edit').trigger('click');
				};

			}).on('click', '.J_selEvent', (function(){  //选择活动
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
			              $this.text(data.name);
			              $this.siblings('input[type=hidden]').val(data.url)
			            }
			          }
			        });
			      }
			    };
			})());

			//拖动排序
			this.box.find('.preview-list').sortable();

			//图片上传
			this.upload(this.box.find('.wgt-upload'));

			valid = form.validate({
				ignore:'input.url:hidden',
				submitHandler:function(form){
				},
				errorPlacement: function(error, element) { 

					if(element.attr('type') == 'hidden'){
						 error.appendTo(element.closest('.edit-controls'));  
					}else{
						error.appendTo(element.parent()); 
					}
				   
				}
			
			});

		},

		upload:function($uploadInput){
			var that = this;

			$uploadInput.uploadImg({
				shop_id: that.cfg.data.shop_id , 
				uploader:'/upload.php',
				onSuccess:function(file, data, res){
					var id = $(this).attr('id').split('-')[2],
						url = $('#'+that.cfg.key+'-urlhidden-'+id).val();

					$('#'+that.cfg.key+'-preview-'+id).find('img').attr('src', url);
					$('#'+that.cfg.key+'-uploadThumb-'+id).show();
				}
			})
		},

		serialize:function(){
			var form = this.box,
				that = this,
				previewList = form.find('[id^='+that.cfg.key+'-preview-]'),
				data = {
					msg_info_type:form.find('input[name=msg_info_type]').val(),
					msg_type:form.find('input[name=msg_type]').val(),
					id:form.find('input[name=id]').val(),
					sorted_ids:'',
					msg_data:[],
					shop_id:that.cfg.data.shop_id
				};

			previewList.each(function(index){
				var id = $(this).attr('id').split('-')[2],
					$ul = $('#'+that.cfg.key+'-edit-'+id),
					eventData = getEventData($ul );

				data.sorted_ids +=id+',';
				data.msg_data.push({	
					itemId:id,
					title:$ul .find('input[name^=title-]').val(),
					picurl:$ul .find('input[name^=uploadurl-]').val(),
					radio:$ul .find('input[name^=link-]:checked').val(),
					text:eventData.text,
					url:eventData.url
				})
			});

			if(_.last(data.sorted_ids) == ',')  data.sorted_ids = data.sorted_ids.substr(0, data.sorted_ids.length-1);

			function getEventData($ul){
				var data ={
					text:'',
					url:''
				};

				if($ul.find('input[name^=link-]:checked').val()==1){
					data.url = $ul.find('[name^=url-]').val();
				}else{
					data.text = $ul.find('[name^=eventname-]').html();
					data.url = $ul.find('[name^=eventurl-]').val();
				};

				return data;
			};

			return data;

		},

		add:function(){
			this.cfg.index ++;
			var data = {
					itemId:this.cfg.index ,
					key:this.cfg.key
				},
				edit = $(this.tpl.edit(data)),
				previewId = this.cfg.key+'-preview-'+this.cfg.index,
				newPreview = this.box.find('.preview-clone').clone();

			newPreview.removeClass('preview-clone').attr('id', previewId);

			this.box.find('.preview-list').append(newPreview);
			this.box.find('.imgtxt-edit').append(edit);

			if(this.box.find('[id^='+this.cfg.key+'-edit-]').length>= this.cfg.maxlength){
				this.box.find('.add-btn').addClass('disabled');
			}

			this.upload(edit.find('.wgt-upload'));
			newPreview.find('.action-edit').trigger('click');
			//$.validator.unobtrusive.parse($('#'+this.cfg.key+'-form'))
		},

		del:function($ele){
			var li = $ele.parents('li').eq(0),
				id = li.attr('id').split('-')[2],
				next = li.prev().length>0?li.prev().find('.action-edit') : this.box.find('.cover-action a'),
				edit = this.box.find('#' + this.cfg.key+'-edit-'+id),
				that = this;


			li.remove();
			edit.remove();
			next.trigger('click');
			that.box.find('.add-btn').removeClass('disabled');

		},
		

		edit:function(idNum){
			var edit = this.box.find('#' + this.cfg.key+'-edit-'+idNum);

			this.box.find('ul.show').removeClass('show');
			edit.addClass('show');
		},

		initData:function(){
			var data = this.cfg.data,
				arr = [];

			for (var i in data.msg_data){
				if(data.msg_data[i] !=null){
					data.msg_data[i]['itemId'] = i;
					data.msg_data[i]['key'] = this.cfg.key;
					arr.push(data.msg_data[i]);

					if(i>this.cfg.index)  this.cfg.index =i;
				}
			}
			if(arr.length<1) arr.push({itemId:1, key:this.cfg.key});

			data.msg_data = arr;
			data.key = this.cfg.key;
			data.maxlength = this.cfg.maxlength;
		},

		render:function(){
			var that = this,
				html = this.tpl.content(this.cfg.data);

			this.box = $(html);
			this.cfg.content.append(that.box);
		},
		destory:function(){
			this.box.off().remove();
		},
		close:function(){},
		init:function(){
			this.initData();
			this.render();
			this.bind();
		}
	};

	module.exports=ImgText;
})