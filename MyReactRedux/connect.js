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
                if(typeof mapDispatchToProps==='function'){//只有一个
                    actions=mapDispatchToProps(this.store.dispatch);
                }else if(typeof mapDispatchToProps==='object'){//多个生成集合
                    actions=bindActionCreators(mapDispatchToProps,this.store.dispatch);
                }
                return <WrapedComponent {...this.state} {...actions}/>
            }
        }
        return ProxyComponent;
    }
}