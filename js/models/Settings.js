import app from '../app';
import BaseModel from './BaseModel';
import ShippingAddresses from '../collections/ShippingAddresses';
import AppearanceSettings from '../models/AppearanceSettings';
import TransactionSettings from '../models/TransactionSettings';
import ServerSettings from '../models/ServerSettings';
import SMTPIntegrationSettings from '../models/SMTPIntegrationSettings';
import SettingsAPIAdaptor from '../utils/settingsAPIAdaptor';

export default class extends BaseModel {
  defaults() {
    return {
      paymentDataInQR: false,
      showNotifications: true,
      showNsfw: true,
      localCurrency: 'USD',
      country: 'UNITED_STATES',
      language: 'en-US',
      termsAndConditions: '',
      refundPolicy: '',
      blockedNodes: [],
      storeModerators: [],
    };
  }

  url() {
    return app.getServerUrl('ob/settings/');
  }

  nested() {
    return {
      shippingAddresses: ShippingAddresses,
      appearanceSettings: AppearanceSettings,
      transactionSettings: TransactionSettings,
      serverSettings: ServerSettings,
      smtpIntegrationSettings: SMTPIntegrationSettings
    };
  }

  parse( response ) {
    return this.fromAPIFormatJSON( response );
  }

  toModelFormatJSON( ) {
    return super.toJSON( );
  }

  toAPIFormatJSON( ) {
    const raw = super.toJSON( );
    return SettingsAPIAdaptor.convertModelToAPIFormat( raw );
  }

  toJSON( ) {
    return this.toAPIFormatJSON( );
  }

  fromAPIFormatJSON( response ) {
    return SettingsAPIAdaptor.convertAPIToModelFormat( response );
  }

  sync(method, model, options) {
    if (method === 'create' && typeof options.type === 'undefined') {
      // we will use PUT unless you explicitly save with POST,
      // e.g. model.save({}, { type: 'POST' })
      options.type = 'PUT';
    }

    return super.sync(method, model, options);
  }
}
