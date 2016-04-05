// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import * as Client from '../utils/client.jsx';

import {FormattedMessage} from 'mm-intl';

export default class TeamExportTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: 'request', link: '', err: ''};

        this.onExportSuccess = this.onExportSuccess.bind(this);
        this.onExportFailure = this.onExportFailure.bind(this);
        this.doExport = this.doExport.bind(this);
    }
    onExportSuccess(data) {
        this.setState({status: 'ready', link: data.link, err: ''});
    }
    onExportFailure(e) {
        this.setState({status: 'failure', link: '', err: e.message});
    }
    doExport() {
        if (this.state.status === 'in-progress') {
            return;
        }
        this.setState({status: 'in-progress'});
        Client.exportTeam(this.onExportSuccess, this.onExportFailure);
    }
    render() {
        var messageSection = '';
        switch (this.state.status) {
        case 'request':
            messageSection = '';
            break;
        case 'in-progress':
            messageSection = (
                <p className='confirm-import alert alert-warning'>
                    <i className='fa fa-spinner fa-pulse'/>
                    <FormattedMessage
                        id='team_export_tab.exporting'
                        defaultMessage=' Exporting...'
                    />
                </p>
            );
            break;
        case 'ready':
            messageSection = (
                <p className='confirm-import alert alert-success'>
                    <i className='fa fa-check'/>
                    <FormattedMessage
                        id='team_export_tab.ready'
                        defaultMessage=' Ready for '
                    />
                    <a
                        href={this.state.link}
                        download={true}
                    >
                        <FormattedMessage
                            id='team_export_tab.download'
                            defaultMessage='download'
                        />
                    </a>
                </p>
            );
            break;
        case 'failure':
            messageSection = (
                <p className='confirm-import alert alert-warning'>
                    <i className='fa fa-warning'/>
                    <FormattedMessage
                        id='team_export_tab.unable'
                        defaultMessage=' Unable to export: {error}'
                        values={{
                            error: this.state.err
                        }}
                    />
                </p>
            );
            break;
        }

        return (
            <div
                ref='wrapper'
                className='user-settings'
            >
                <h3 className='tab-header'>
                    <FormattedMessage
                        id='team_export_tab.export'
                        defaultMessage='Export'
                    />
                </h3>
                <div className='divider-dark first'/>
                <ul className='section-max'>
                    <li className='col-xs-12 section-title'>
                        <FormattedMessage
                            id='team_export_tab.exportTeam'
                            defaultMessage='Export your team'
                        />
                    </li>
                    <li className='col-xs-offset-3 col-xs-8'>
                        <ul className='setting-list'>
                            <li className='setting-list-item'>
                                <a
                                    className='btn btn-sm btn-primary btn-file sel-btn'
                                    href='#'
                                    onClick={this.doExport}
                                >
                                    <FormattedMessage
                                        id='team_export_tab.export'
                                        defaultMessage='Export'
                                    />
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div className='divider-dark'/>
                {messageSection}
            </div>
        );
    }
}