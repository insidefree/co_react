import UI from 'editor-ui-lib';
import React from 'react'

export default class Settings extends React.Component {
    render () {
        return (
            <div>
                <UI.textInput
                    title="Title"
                    defaultText="Title"
                    onChange={(newVal)=>this.props.onUpdate('settings_textFieldContent', newVal)}/>

                  <hr className="divider-long"/>

                <UI.textInput
                    isMultiLine={true}
                    title="Script area"
                    focus={true}
                    defaultText="Paragraph"
                    onChange={(newVal)=>this.props.onUpdate('settings_textAreaContent', newVal)}/>
            </div>
        )
    }
}
