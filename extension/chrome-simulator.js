// Copyright (C) 2023 Ethan Uppal. All rights reserved.

const ChromeExtensionSimulator = {
    run: function (callback) {
        if (typeof chrome === 'undefined') {
            var url = 'example.com';
            window.addEventListener('message', event => {
                url = event.data.url || url;
                var chrome = {
                    tabs: {
                        query: (options, callback2) => {
                            callback2([{url: url}]);
                        }
                    }
                };
                callback(chrome);
            }, true);
        } else {
            callback(chrome);
        }
    }
};
