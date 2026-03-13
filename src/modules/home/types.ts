import type { TonnerLineKey } from '../catalog/tonnerLines';
import type { Product } from '../catalog/types';
import type { UserType } from '../onboarding/userTypes';

export interface HomeScreenProps {
  userType: UserType;
  selectedLocation: string;
  onSelectLine: (line: TonnerLineKey) => void;
  onRecommendProduct: (product: Product) => void;
  onOpenCatalog: () => void;
  onOpenDistributors: () => void;
}
