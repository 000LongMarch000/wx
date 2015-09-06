/*jslint nomen: true*/

/*global define, _*/

define(function (require, exports, module) {
  'use strict';
  
  var config = {
    api: {
      filter: '/admin/api/{{filter}}',
      catalog: '/admin/api/{{type}}?category={{category}}&type={{filter}}&query={{query}}&limit={{limit}}&page={{page}}',
      uploader: '/upload.php'
    },
    
    options: {
      coupons: {
        multiple: false,
        max: -1
      },
      events: {
        multiple: false,
        max: -1
      },
      tags_group: {
        multiple: false,
        max: -1
      },
      images: {
        multiple: false,
        max: 6
      },
      pages: {
        multiple: false,
        max: -1
      },
      products: {
        multiple: false,
        max: -1
      },
      populars: {
        multiple: false,
        max: -1
      }
    },
    
    constructor: {
      coupons: {
        catalog: {
          limit: 6,
          map: function (data) {
            if (!data) {
              return;
            }
            
            return _.map(data.data, function (item) {
              return _.extend(item, {
                formated_start_time: new Date(item.start_time * 1000).format('yyyy-MM-dd'),
                formated_end_time: new Date(item.end_time * 1000).format('yyyy-MM-dd'),
                formated_start_using_start: new Date(item.start_using_start * 1000).format('yyyy-MM-dd'),
                formated_start_using_end: new Date(item.start_using_end * 1000).format('yyyy-MM-dd')
              });
            });
          }
        },
        pagination: {
          map: function (data) {
            if (!data) {
              return;
            }
            
            return {
              pages: Number(data.total_pages),
              page: Number(data.curr_pages)
            };
          }
        }
      },
      events: {
        filters: {
          eventtype: '选择活动类型'
        },
        catalog: {
          limit: 6,
          map: function (data) {
            if (!data) {
              return;
            }
            
            return _.map(data.data, function (item) {
              return _.extend(item, {
                formated_start_time: new Date(item.start_time * 1000).format('yyyy-MM-dd'),
                formated_end_time: new Date(item.end_time * 1000).format('yyyy-MM-dd')
              });
            });
          }
        },
        pagination: {
          map: function (data) {
            if (!data) {
              return;
            }
            
            return {
              pages: Number(data.total_pages),
              page: Number(data.curr_pages)
            };
          }
        }
      },
      
      tags_group: {
        catalog: {
          limit: 6,
          map: function (data) {
            if (!data) {
              return;
            }
            
            return _.map(data.data, function (item) {
              return {
                id: item.id,
                title: item.title,
                count: item.count
              };
            });
          }
        },
        pagination: {
          map: function (data) {
            if (!data) {
              return;
            }
            
            return {
              pages: Number(data.total_pages),
              page: Number(data.curr_pages)
            };
          }
        }
      },
      
      images: {
        categories: {
          data: [{
            id: 'other',
            name: '其他图片',
            use: ['uploader']
          }, {
            id: 'product',
            name: '商品图片'
          }]
        },
        catalog: {
          limit: 15,
          map: function (data) {
            if (!data) {
              return;
            }
            
            return _.map(data.data, function (item) {
              return {
                id: item.id,
                url: item.url,
                w: item.w,
                h: item.h
              };
            });
          }
        },
        pagination: {
          map: function (data) {
            if (!data) {
              return;
            }
            
            return {
              pages: Number(data.total_pages),
              page: Number(data.curr_pages)
            };
          }
        },
        uploader: {
          name: '上传图片'
        }
      },
      
      pages: {
        catalog: {
          limit: 6,
          map: function (data) {
            if (!data) {
              return;
            }
            
            return _.map(data.data, function (item) {
              return _.extend(item, {
                formated_created_at: new Date(item.created_at * 1000).format('yyyy-MM-dd')
              });
            });
          }
        },
        pagination: {
          map: function (data) {
            if (!data) {
              return;
            }
            
            return {
              pages: Number(data.total_pages),
              page: Number(data.curr_pages)
            };
          }
        }
      },
      
      products: {
        filters: {
          tag: '常用标签',
          search: ''
        },
        catalog: {
          limit: 6,
          map: function (data) {
            if (!data) {
              return;
            }
            
            return _.map(data.data, function (item) {
              return _.extend(item, {
                formated_created_at: new Date(item.created_at * 1000).format('yyyy-MM-dd')
              });
            });
          }
        },
        pagination: {
          map: function (data) {
            if (!data) {
              return;
            }
            
            return {
              pages: Number(data.total_pages),
              page: Number(data.curr_pages)
            };
          }
        }
      },
      
      populars: {
        catalog: {
          limit: 6,
          map: function (data) {
            if (!data) {
              return;
            }
            
            return _.map(data.data, function (item) {
              return _.extend(item, {
                formated_start_time: new Date(item.start_time * 1000).format('yyyy-MM-dd'),
                formated_end_time: new Date(item.end_time * 1000).format('yyyy-MM-dd') 
              });
            });
          }
        },
        pagination: {
          map: function (data) {
            if (!data) {
              return;
            }
            
            return {
              pages: Number(data.total_pages),
              page: Number(data.curr_pages)
            };
          }
        }
      }
    }
  };
  
  module.exports = config;
});
