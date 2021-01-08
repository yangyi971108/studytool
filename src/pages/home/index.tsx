import React from 'react';
import { connect } from 'dva';
import { Card, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { history } from 'umi';
import Gephi from './components/gephi';

//@ts-ignore
const gridStyle = {
  width: '33%',
  textAlign: 'center',
  lineHeight:'150px',
};

class Home extends React.Component<any, any> {
  componentDidMount(): void {
    this.props.dispatch({
      type: 'home/getSubjects',
    });
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
  }

  handleCardClick = (currentSubjectName: string,graph:string) => {
    console.log('haaaaaaaaaaaaaaaaa',currentSubjectName);
    this.props.dispatch({
      type: 'home/updateCurrentSubjectName',
      payload: {
        currentSubjectName,
      },
    });
    this.props.dispatch({
      type:'home/getSubjectGraph',
      payload: {
        currentSubjectName,
      },
    });
    this.props.dispatch({
      type:'home/updateGraph',
      payload:{
        graph,
      }
    })
  };

  handleDomainClick = (currentDomainName: string) => {
    this.props.dispatch({
      type: 'globalData/updateCurrentDomainName',
      payload: {
        currentDomainName,
      }
    });
    history.push('/learning');
  };

 


  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const { subjects, currentSubjectName, graph } = this.props;
    console.log('cuuuuuuuuuuuuuu',currentSubjectName);
    console.log('subjects.length',subjects.length);
    
    return (
      <div style={{ background: '#ECECEC', padding: '20px 30px 30px' }}>
        <Breadcrumb style={{ marginBottom: '20px' }}>
          <Breadcrumb.Item onClick={() => this.handleCardClick('','')}>
            <HomeOutlined style={{cursor: 'pointer'}} />
          </Breadcrumb.Item>
          {
            currentSubjectName !== '' &&
            <Breadcrumb.Item>
              {currentSubjectName}
            </Breadcrumb.Item>
          }
        </Breadcrumb>
         {
          currentSubjectName === '' ?
          (
            <Card style={{ textAlign: 'center',fontSize:'33px'}}>
            {
              subjects.length === 1?
              (
                // subjects[0] === '计算机科学'?(
                //   <div></div>
                // ):
                // (
                  //@ts-ignore
                <Card.Grid style={{width: '100%',textAlign: 'center',lineHeight:'500px',}}  hoverable onClick={() => this.handleCardClick(subjects[0],graph)}>
                {subjects[0]}
                 </Card.Grid>
                //) 
              ):
              (
                subjects.length === 3?(
                  //@ts-ignore
                  subjects.map((subjectName) => (
                    //@ts-ignore
                       <Card.Grid style={{width: '100%',textAlign: 'center',lineHeight:'150px',}}  hoverable onClick={() => this.handleCardClick(subjectName,graph)}>
                         {subjectName}
                       </Card.Grid>
                    
                   )) 
                ):
                (
                  //@ts-ignore
                  subjects.map((subjectName) => (
                    //@ts-ignore
                       <Card.Grid style={{width: '33.3%',textAlign: 'center',lineHeight:'150px',}}  hoverable onClick={() => this.handleCardClick(subjectName,graph)}>
                         {subjectName}
                       </Card.Grid>
                   )) 
                )            
              )  
            }
          </Card>
          ):
          (
            <div >
            {graph ? <Gephi subjectName={currentSubjectName} gephi={graph}/> : <div>该学科没有图谱</div>}
            </div>
          )
          
        }
        {/* {
          currentSubjectName === '' ?
          (
            <Card style={{ textAlign: 'center',fontSize:'33px'}}>
            {
              subjects.length === 1?
              (
                subjects[0].subjectName === '计算机科学'?(
                  <div></div>
                ):
                (
                  //@ts-ignore
                <Card.Grid style={{width: '100%',textAlign: 'center',lineHeight:'500px',}}  hoverable onClick={() => this.handleCardClick(subjects[0].subject_name,graph)}>
                {subjects[0].subjectName}
                 </Card.Grid>
                ) 
              ):
              (
                subjects.length === 3?(
                  subjects.map((data: { subjectName: {} | null | undefined; }) => (
                    //@ts-ignore
                       <Card.Grid style={{width: '100%',textAlign: 'center',lineHeight:'150px',}}  hoverable onClick={() => this.handleCardClick(data.subject_name,graph)}>
                         {data.subjectName}
                       </Card.Grid>
                    
                   )) 
                ):
                (
                  subjects.map((data: { subjectName: {} | null | undefined; }) => (
                    //@ts-ignore
                       <Card.Grid style={gridStyle}  hoverable onClick={() => this.handleCardClick(data.subjectName,graph)}>
                         {data.subjectName}
                       </Card.Grid>
                    
                   )) 
                )            
              )  
            }
          </Card>
          ):
          (
            <div >
            {graph ? <Gephi subjectName={currentSubjectName} gephi={graph}/> : <div>该学科没有图谱</div>}
            </div>
          )
          
        } */}
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const { subjects, currentSubjectName,graph } = state.home;
  return {
    subjects,
    currentSubjectName,
    graph,
  }
}

export default connect(mapStateToProps)(Home);
