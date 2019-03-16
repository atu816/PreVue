import {
  ADD_TO_COMPONENT_MAP,
  UPDATE_CHILDREN,
  ADD_TO_SELECTED_ELEMENT_LIST,
  SET_SELECTED_ELEMENT_LIST,
  SET_CLICKED_COMPONENT,
  ADD_TO_COMPONENT_HTML_LIST,
  SET_CLICKED_ELEMENT_LIST,
  DELETE_CLICKED_COMPONENT,
  SET_COMPONENT_MAP,
  GET_PREV_STATE,
  DELETE_SELECTED_ELEMENT,
  SET_STATE,
  ADD_PROJECT,
  CHANGE_ACTIVE_TAB,
  ADD_COMPONENT_TO_ACTIVE_ROUTE,
  ADD_ROUTE,
  SET_ACTIVE_COMPONENT,
  SET_ACTIVE_ROUTE,
  SET_ROUTES
} from './types';

const mutations = {
  [ADD_TO_COMPONENT_MAP]: (state, payload) => {
    const { componentName, htmlList, children } = payload;
    state.componentMap = {
      ...state.componentMap,
      [componentName]: {
        componentName,
        x: 0,
        y: 0,
        w: 200,
        h: 200,
        children,
        htmlList
      }
    };
  },
  [UPDATE_CHILDREN]: function(state, payload) {
    const { name, newArray } = payload;
    state.componentMap[name].children = newArray;
  },
  [ADD_TO_SELECTED_ELEMENT_LIST]: (state, payload) => {
    state.selectedElementList.push({ text: payload, children: [] });
  },
  [SET_SELECTED_ELEMENT_LIST]: (state, payload) => {
    state.selectedElementList = payload;
  },
  [SET_CLICKED_COMPONENT]: (state, payload) => {
    state.clickedComponent = payload;
  },
  [ADD_TO_COMPONENT_HTML_LIST]: (state, elementName) => {
    const componentName = state.clickedComponent;
    state.componentMap[componentName].htmlList.push({
      text: elementName,
      children: []
    });
  },
  [SET_CLICKED_ELEMENT_LIST]: (state, payload) => {
    const componentName = state.clickedComponent;
    state.componentMap[componentName].htmlList = payload;
  },
  [DELETE_CLICKED_COMPONENT]: state => {
    const { componentMap, clickedComponent: componentName } = state;

    let newObj = Object.assign({}, componentMap);

    delete newObj[componentName];

    console.log(componentMap);
    for (let compKey in newObj) {
      let children = newObj[compKey].children;
      children.forEach((child, index) => {
        if (componentName === child) children.splice(index, 1);
      });
    }
    state.componentMap = newObj;
  },
  [SET_COMPONENT_MAP]: (state, payload) => {
    console.log(payload);
    state.componentMap = payload;
  },
  [GET_PREV_STATE]: (state, payload) => {
    Object.assign(state, payload);
  },
  [DELETE_SELECTED_ELEMENT]: (state, payload) => {
    state.selectedElementList.splice(payload, 1);
  },
  [SET_STATE]: (state, payload) => {
    console.log('SETTING STATE');
    console.log(payload);
    Object.assign(state, payload);
  },
  [ADD_PROJECT]: (state, payload) => {
    console.log('PUSHING ', payload);
    state.projects.push(payload);
    state.projectNumber++;
  },
  [CHANGE_ACTIVE_TAB]: (state, payload) => {
    state.activeTab = payload;
  },
  [ADD_ROUTE]: (state, payload) => {
    state.routes = {
      ...state.routes,
      [payload]: []
    };
  },
  [SET_ACTIVE_ROUTE]: (state, payload) => {
    state.activeRoute = payload;
  },
  [ADD_COMPONENT_TO_ACTIVE_ROUTE]: (state, payload) => {
    state.routes[state.activeRoute].push(payload);
  },
  [SET_ACTIVE_COMPONENT]: (state, payload) => {
    state.activeComponent = payload;
  },
  [SET_ROUTES]: (state, payload) => {
    state.routes = Object.assign({}, payload);
  }
};

export default mutations;
