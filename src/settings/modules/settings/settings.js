import UI from 'editor-ui-lib';
import React from 'react'

export default class Settings extends React.Component {
    render() {
        return (
            <div>
                <UI.textInput
                    placeholder="Title"
                    defaultText="Title"
                    onChange={(newVal) => this.props.onUpdate('settings_textFieldContent', newVal)} />

                <hr className="divider-long" />

                <UI.textInput
                    isMultiLine={true}
                    title="google_ad_client"
                    placeholder="place the code of ads here..."
                    onChange={(newVal) => this.props.onUpdate('settings_textAreaContent', newVal)} />

                <UI.textInput
                    isMultiLine={true}
                    title="ads"
                    placeholder="Place your ads here..."
                    onChange={(newVal) => this.props.onUpdate('ads', newVal)} />
            </div>
        )
    }
}
