import HomeCliente from './HomeCliente';
import HomeContratista from './HomeContratista';
import HomeDistribuidor from './HomeDistribuidor';
import type { HomeScreenProps } from './types';

export default function HomeScreen(props: HomeScreenProps) {
  switch (props.userType) {
    case 'cliente':
      return <HomeCliente {...props} />;
    case 'contratista':
      return <HomeContratista {...props} />;
    case 'distribuidor':
      return <HomeDistribuidor {...props} />;
    default:
      return <HomeCliente {...props} />;
  }
}
