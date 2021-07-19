import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import {AddressEdit ,AddressList ,Icon,SubmitBar,Stepper,Step, Steps,SwipeCell ,Checkbox, CheckboxGroup,Field ,Form,Tag,Button,Image as VanImage,ImagePreview ,Card ,Swipe, SwipeItem, Lazyload, Badge, Sidebar, SidebarItem, Collapse, CollapseItem, Tab, Tabs} from 'vant';

createApp(App)
    .use(Swipe).use(SwipeItem).use(Lazyload, {
    loading: require('./assets/images/default.jpg')
}).use(Badge).use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem)
    .use(Tab).use(Tabs).use(Card).use(ImagePreview).use(VanImage).use(Tag)
    .use(Button).use(Form).use(Field).use(Checkbox).use(CheckboxGroup)
    .use(SwipeCell).use(Step).use(Steps).use(Stepper).use(SubmitBar).use(Icon)
    .use(AddressList).use(AddressEdit)
    .use(store).use(router).mount('#app')
