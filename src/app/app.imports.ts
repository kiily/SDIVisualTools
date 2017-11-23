
//SERVICES

//Authentication
import { AuthValidator } from './common/validators/auth.validator';
import { AuthService } from './services/auth.service';

//In-app Alerts
import { AlertGenerator } from './components/alerts/alert-generator';

//HTTP Services
import { InnoflowHttpService } from './services/innoflow-services/innoflow-http.service';
import { SEATHttpService } from './services/seat-services/seat-http.service';
import { DiscoveryHttpService } from './services/discovery-services/discovery-http.service';

//Firebase Services
import { DiscoveryFirebaseService } from './services/discovery-services/discovery-firebase.service';
import { InnoflowFirebaseService } from './services/innoflow-services/innoflow-firebase.service';
import { SEATFirebaseService } from './services/seat-services/seat-firebase.service';


export const SERVICES = [
    SEATFirebaseService,
    SEATHttpService,
    AuthService,
    DiscoveryFirebaseService,
    DiscoveryHttpService,
    InnoflowHttpService,
    InnoflowFirebaseService,
    AlertGenerator,
    AuthValidator
];