import type { TonnerLineKey } from '../catalog/tonnerLines';
import type { UserType } from '../onboarding/userTypes';

export interface HomeScreenProps {
  userType: UserType;
  selectedLocation: string;
  onSelectLine: (line: TonnerLineKey) => void;
  onOpenCatalog: () => void;
  onOpenDistributors: () => void;
}
