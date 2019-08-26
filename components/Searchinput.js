import React from 'react';
import {Text,View,StyleSheet,TextInput} from 'react-native';

export default class Searchinput extends React.Component{
    constructor(props){
        super(props);
        this.state={text:''};
    };

    handleChangeText=text=>{    
        this.setState({text});
    };
    handleSubmitEditing=()=>{
        const {onSubmit}=this.props;
        const {text}=this.state;
        if(!text) return;
        
        onSubmit(text);
        this.setState({text:''});
    };

    render(){
        const {placeholder}=this.props;
        const {text}=this.state;
        return(
            <View style={styles.container}>
                <TextInput 
        autocorrect={false}
        value={text}
        placeholder={placeholder}
        placeholderTextColor="white"
        style={styles.textInput}
        clearButtonMode="always"
        onChangeText={this.handleChangeText}
        onSubmitEditing={this.handleSubmitEditing} />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#666',
        color:'white',
        height:40,
        marginTop:20,
        marginHorizontal:40,
        paddingHorizontal:10,
        borderRadius:5,
    },
    textInput:{
        flex:1,
        color:'white',
    
    },
})