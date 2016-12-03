import BaseModel from './BaseModel';
import app from '../app';

export default class extends BaseModel {
  defaults() {
    return {
      smtpNotifications: false,
      smtpServerAddress: 'defaultservername',
      smtpUserName: '',
      smtpPassword: '',
      smtpFromEmail: '',
      smtpToEmail: ''
    };
  }

  validate(attrs) {
    const errObj = {};
    const addError = (fieldName, error) => {
      errObj[fieldName] = errObj[fieldName] || [];
      errObj[fieldName].push(error);
    };

    if (attrs.smtpNotifications) {
      if ( attrs.smtpServerAddress.trim().length == 0 )
        addError( 'smtpServerAddress', app.polyglot.t( 'smtpIntegrationModelErrors.smtpServerAddress' ) );
      if ( attrs.smtpUserName.trim().length == 0 )
        addError( 'smtpUserName', app.polyglot.t( 'smtpIntegrationModelErrors.smtpUserName' ) );
      if ( attrs.smtpPassword.trim().length == 0 )
        addError( 'smtpPassword', app.polyglot.t( 'smtpIntegrationModelErrors.smtpPassword' ) );
      if ( attrs.smtpFromEmail.trim().length == 0 )
        addError( 'smtpFromEmail', app.polyglot.t( 'smtpIntegrationModelErrors.smtpFromEmail' ) );
      if ( attrs.smtpToEmail.trim().length == 0 )
        addError( 'smtpToEmail', app.polyglot.t( 'smtpIntegrationModelErrors.smtpToEmail' ) );
    }

    if (Object.keys(errObj).length) {
      console.warn( errObj );
      return errObj;
    }

    return undefined;
  }
}
