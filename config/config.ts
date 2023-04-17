const environment = process.env.NODE_ENV || 'development';

let config;

switch (environment) {
  case 'development':
    config = await import('./development');
    break;  
  default:
    config = await import('./development');
    break;
}

export default config.default;
