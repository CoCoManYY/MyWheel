import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import propTypes from 'props-types';
export default function connnect(mapStateToProps,mapDispatchToProps){
    return WrapedComponent=>{
        class ProxyComponent extends Component{
            static contextType={
                store:propTypes.object
            }
            constructor(props,context){
                super(props,context);
                this.store=context.store;
                this.state=mapStateToProps(this.store.getState());
            }
            componentWillMount(){
                this.store.subscribe(()=>{
                    this.setState(mapStateToProps(this.store.getState()));
                });
            }
            render(){
                let actions={};
                if(typeof mapDispatchToProps==='function'){//可以是个函数
                    actions=mapDispatchToProps(this.store.dispatch);
                }else if(typeof mapDispatchToProps==='object'){//对象，需要自己再封装
                    actions=bindActionCreators(mapDispatchToProps,this.store.dispatch);
                }
                return <WrapedComponent {...this.state} {...actions}/>
            }
        }
        return ProxyComponent;
    }
}