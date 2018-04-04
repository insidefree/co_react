define(['react', 'Wix'], function (React, Wix) {
    return React.createClass({
        getInitialState: () => {
            return {
                settingsUpdate: {},
                showBox: false,
                textFieldContent: 'Title',
                textAreaContent: 'Script Area',
                ads: ''
            }
        },
        componentDidMount: function () {
            this.updateCompHeight(400);
            Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, (data) => this.onSettingsUpdate(data));
            // You can get the style params programmatically, un-comment the following snippet to see how it works:
            // Wix.Styles.getStyleParams(function (style) {
            //     console.log(style);
            // });

            // You can also get the style every time it changes, try this:
            // Wix.addEventListener(Wix.Events.STYLE_PARAMS_CHANGE, function (style) {
            //     console.log(style);
            // });
        },
        onSettingsUpdate: function (update) {
            this.setState({
                settingsUpdate: update,
                showBox: true,
                textFieldContent: update.key === 'settings_textFieldContent' ? update.value : this.state.textFieldContent,
            }, this.updateCompHeight)



            // if (update.key === 'settings_textAreaContent') {
            //     if (WixSDK.Utils.getViewMode() == 'site') {
            //         // <script async src="http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            //         var getSrc = /<script.*?src="(.*?)"/
            //         var src = getSrc.exec(update.value)
            //         const scriptAdsByGoogle = document.createElement('script')
            //         scriptAdsByGoogle.async = 'async'
            //         scriptAdsByGoogle.src = src[1]
            //         console.log(scriptAdsByGoogle)
            //         document.getElementsByTagName('head')[0].appendChild(scriptAdsByGoogle)
            //     }


                //     /* 
                //         <script>
                //             (adsbygoogle = window.adsbygoogle || []).push({
                //             google_ad_client: "ca-pub-4781162476058829",
                //             enable_page_level_ads: true
                //             });
                //         </script>
                //     */

                //     var dataAdClient = update.value.split('data-ad-client="')[1].split('"')[0]
                //     console.log('--dataAdClient', dataAdClient)
                //     var dataAdSlot = update.value.split('data-ad-slot="')[1].split('"')[0]
                //     console.log('--dataAdSlot', dataAdSlot)

                //     var ins = document.createElement('ins')
                //     // ins.class = 'adsbygoogle'
                //     ins.style='display:block'
                //     ins.setAttribute('class', 'adsbygoogle')
                //     ins.setAttribute('data-add-client', dataAdClient)
                //     ins['data-add-client'] = dataAdClient
                //     ins.setAttribute('data-add-slot', dataAdSlot)
                //     ins.setAttribute('data-add-format', 'auto')

                //     console.log('--ins', ins)
                //     document.getElementsByTagName('head')[0].appendChild(ins)

                //     var content = update.value.split('<script>')[1].split('</script>')[0]
                //     const scriptContent = document.createElement('script')
                //     scriptContent.appendChild(document.createTextNode(content))
                //     document.getElementsByTagName('head')[0].appendChild(scriptContent)
            // }

            if (update.key === 'ads') {
                /* 
                <ins class="adsbygoogle"
                    style="display:block"
                    data-ad-client="ca-pub-4781162476058829"
                    data-ad-slot="3562182514"
                    data-ad-format="auto">
                </ins>
                */
                document.getElementById('ads').innerHTML = update.value
            }

        },
        updateCompHeight: (height) => {
            const desiredHeight = height || document.documentElement.scrollHeight;
            Wix.setHeight(desiredHeight);
        },
        navToHome: () => {
            Wix.getSiteMap(pages => {
                Wix.navigateToPage(pages[0].pageId.substring(1));
            });
        },
        stringify: (input) => {
            try {
                return JSON.stringify(input, null, 4);
            } catch (err) {
                return input;
            }
        },
        render: function () {
            const { settingsUpdate, textFieldContent, textAreaContent } = this.state;
            return (
                <div>
                    <div className="wix-style-sample">
                        <h3 className="sample-element sample-title">{textFieldContent}</h3>
                        <div id="ads"></div>
                    </div>
                </div>
            )
        }
    });
});
