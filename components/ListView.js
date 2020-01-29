import React, { Component } from 'react';
import { Text, View, TouchableHighlight} from 'react-native';
import TodoModel from '../models/TodoModel';
import OmniBox from './OmniBox';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
import Utils from '../Utils';

/*
  dataList:
    in unserem Beispiel ein Array
    Dies könnte auch ein Server sein mit einer Datenbank
*/

let dataList = [
  new TodoModel('Hallo Koding'),
  new TodoModel('Wir erstellen eine Aufgaben-App mit React Native'),
  new TodoModel('Klicken um Aufgabe abzuhaken'),
  new TodoModel('Lange drücken, um Todo zu verschieben')
];

var dataListOrder = getOrder(dataList);

function getOrder(list) {
  return Object.keys(list);
}

/*
  Funktion um Aufgaben neu zu ordnen:
    dazu wird die Hilfsfunktion move verwendet (aus Utils.js)
*/

function moveOrderItem(listView, fromIndex, toIndex) {
  Utils.move(dataListOrder, parseInt(fromIndex), parseInt(toIndex));
  if (listView.forceUpdate) listView.forceUpdate();
}

class ListView extends Component {
  constructor(props) {
    super(props);
    this.updateDataList = this.updateDataList.bind(this);
    this._onCompletedChange = this._onCompletedChange.bind(this);
    this.state = {
      dataList: dataList
    }
  }

  updateDataList(dataList) {
    dataListOrder = getOrder(dataList);
    this.setState({
      dataList: dataList
    });
  }

  _onCompletedChange(dataItem, index) {
    let fromIndex = dataListOrder.indexOf(index);
    let toIndex = dataItem.completed ? dataListOrder.length - 1 : 0;
    moveOrderItem(this, fromIndex, toIndex);
  }

  render() {
    let listView = (<View></View>);
    if (this.state.dataList.length) {
      listView = (
        <SortableListView
          style={{flex: 1}}
          data={this.state.dataList}
          order={dataListOrder}
          onRowMoved={e => moveOrderItem(this, e.from, e.to)}
          renderRow={(dataItem, section, index) => <ListViewItem data={dataItem} dataIndex={index} onCompletedChange={this._onCompletedChange}/>}
        />
      );
    }

    return (
        <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
          <OmniBox
            data={dataList}
            updateDataList={this.updateDataList}/>
          {listView}
        </View>
    )
  }
}

module.exports = ListView;
