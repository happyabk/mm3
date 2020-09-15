import TappingMoltenScheduleStore from './store/TappingMoltenScheduleStore';
import { MasterCodeStore }  from '@/common';

export default {
  m2dc010110Store: TappingMoltenScheduleStore.instance,
  m2dc010110publicCodeStore: MasterCodeStore.instance,
};
