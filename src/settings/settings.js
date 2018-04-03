import UI from 'editor-ui-lib';
import React from 'react'
import Wix from 'Wix';
import Main from './modules/main/main';
import Settings from './modules/settings/settings';
import Layout from './modules/layout/layout';
import Design from './modules/design/design';
import Animations from './modules/animations/animations';
import Support from './modules/support/support';

export default class settings extends React.Component {
    constructor() {
        super()
        this.state = {}
        this.settingsUpdate = this.settingsUpdate.bind(this);
    }

    settingsUpdate(key, value) {
        const data = { key: key, value: value }
        Wix.Settings.triggerSettingsUpdatedEvent(data)
        console.log(data)
        Wix.Data.Public.set(
            'adCode' + Wix.Utils.getCompId(),
            { code: value },
            { scope: 'COMPONENT' },
            function (data) { },
            function (f) { }
        )
    }

    render() {
        return (
            <UI.appSettings>
                <UI.panelTabs defaultTabIndex={0}>
                    <Settings tab="Settings" onUpdate={this.settingsUpdate} />
                </UI.panelTabs>
            </UI.appSettings>
        )
    }
}
