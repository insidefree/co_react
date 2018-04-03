define(['react', 'Wix'], function (React, Wix) {
    return React.createClass({
        getInitialState: () => {
            return {
                settingsUpdate: {},
                showBox: false,
                textFieldContent: 'Title',
                textAreaContent: 'Script Area'
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

            if (update.key === 'settings_textAreaContent') {
                const script = document.createElement('script')
                script.appendChild(document.createTextNode(update.value))
            } 
            
            console.log('settingsUpdate', this.state)
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
                        <div className="sample-element sample-input">{textAreaContent}</div>
                    </div>
                </div>
            )
        }
    });
});
