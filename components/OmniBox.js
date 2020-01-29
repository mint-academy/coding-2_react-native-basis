import React, { Component } from 'react';
import { TextInput } from 'react-native';
import TodoModel from '../models/TodoModel';
import Utils from '../Utils';

class OmniBox extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      newValue: ''
    });
  }

  /*
   onChange: Funktion
     Bei jeglicher Änderung wird diese Funktion aufgerufen
  */

  onChange(event){
    var title = event.nativeEvent.text;
    var dataList = this.props.data.filter((item) => item.title.match(new RegExp('.*' + title +'.*', 'gi')));

    this.setState({
      newValue: title
    });
    this.props.updateDataList(dataList);
  }

  /*
   onSubmit: Funktion
     Beim "Enter" bei der Aufgabe wird diese Funktion aufgerufen
  */

  onSubmit(event){
    console.log(event.nativeEvent);
    if (this.state.newValue) {
      var newDataItem = new TodoModel(this.state.newValue);

      var dataList = this.props.data;
      var dataItem = Utils.findTodo(newDataItem, dataList);
      if(dataItem) {
        Utils.move(dataList, (dataList.indexOf(dataItem)), 0);

        this.setState({
          newValue: ''
        });
        this.props.updateDataList(dataList);
        return;
      }

      dataList.unshift(newDataItem);

      this.setState({
        newValue: ''
      });
      this.props.updateDataList(dataList);
    }
  }

  render() {
    return (
      <TextInput style={{height: 36, padding: 4, marginBottom: 0, fontSize: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 8, backgroundColor: '#fff'}}
        placeholder='Aufgabe suchen oder hinzufügen'
        blurOnSubmit={false}
        onSubmitEditing={(event) => this.onSubmit( event )}
        multiline={false}
        value={this.state.newValue}
        onChange={this.onChange}>
      </TextInput>
    );
  }
}

module.exports = OmniBox;
