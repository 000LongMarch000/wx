define(function(require, exports, module){
  var CtlBase = require('./base'),
      tpl = require('../tpls/ctl_audio.tpl'),
      isAudioSupport = window['Audio'] && (new Audio().canPlayType('audio/mpeg'));

  var CtlAudio = CtlBase.View.extend({
    template: Handlebars.compile(tpl),

    events: {
      'click .ctl-audio': 'playOrPause'
    },

    initialize: function(opts){
      var self = this;

      CtlBase.View.prototype.initialize.apply(this, arguments);

      var audio = new Audio();
      audio.addEventListener('error', function(e){
        self.stopLoading();
        self.renderError();
        if (console && console.error) console.error(e);
      });
      audio.addEventListener('canplay', function(){
        self.stopLoading();
      });
      this.audio = audio;
      this.opts = opts;
      this._loadTime = 0;

      //if (opts.data && opts.data.audio_url) this.loadAudio(opts.data.audio_url);

      return this;
    },

    render: function(){
      var self = this;
      CtlBase.View.prototype.render.apply(this, arguments);

      this.$preview = this.$el.find('.ctl-audio');
      if (this.audio) {
        this.$el.append(this.audio);
      }
    },

    renderError: function(){
      this.$el.append('<p class="note">加载出错，请稍后再试...</p>');
    },

    playOrPause: function(){
      var audio = this.audio;
      if (!this._loadTime) {
        this.loadAudio(this.opts.data.audio_url);
      }

      if (!audio || audio.error) return;

      if (audio.paused) {
        audio.play();
        this.$preview.addClass('playing');
      } else {
        audio.pause();
        this.$preview.removeClass('playing');
      }
    },

    loadAudio: function(url, opts){
      if (!this.audio) return false;
      this._loadTime ++;
      opts = opts || {};

      this.$preview.show();
      var audio = this.audio,
          self = this;

      _.extend(audio, opts);
      this.startLoading();
      audio.src = url;
    },

    updateInfo: function(){
      var audio = this.audio,
          duration = audio.duration;

      this.$el.find('audio-duration');
    },

    startLoading: function(){
      this.$el.find('p.note').remove();
      this.$preview.addClass('loading');
    },

    stopLoading: function(){
      this.$preview.removeClass('loading');
    },

    remove: function(){
      this.audio = null;
      CtlBase.View.prototype.remove.call(this);
    }
  });

  CtlAudio.isAudioSupport = isAudioSupport;

  module.exports = CtlAudio;
});