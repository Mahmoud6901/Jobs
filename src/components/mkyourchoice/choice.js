import React, { Component } from 'react';
import { Form, Button, Row, Col, Container, ToggleButton, ButtonGroup } from 'react-bootstrap';
import './action.css';
import axios from "axios";

export default class MakeYourChoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            jobId: null,
            search: {
                
                type: '',
                positionType: "disabled",
                positionName: "disabled",
                customDate: "disabled",
                intern: "disabled",
                startDate: "",
                endDate: "",
            },
            jobType: [],
            JobName: [],
            internName: [
               
            ],
            pickDate: [
                { value: 'disabled', name: 'Choose Date'},
                { value:  1, name: 'Last month'},
                { value:  2, name: 'Last 2 months'},
                { value:  3, name: 'Last 3 months'},
                { value:  'customDate', name: 'Pick a Range Date'},
            ],
            
        }
    }

    handleSubmit(e) {
        e.stopPropagation();
        e.preventDefault();
        // console.log(this.state.JobName)
        this.state.JobName.map((N, I) => {
            // console.log(N.Job_Type)
            // console.log(this.state.search.positionName);
            // console.log(N.Job_Type)
            // console.log(this.state.search.jobId)
            if( this.state.search.positionName === N.Name) {
                // console.log(this.state.search.positionName);
                
                
                // this.setState(prev=>({
                    // ...prev,
                   
                        this.state.jobId = N.Job_Type
                      
                        
                    
                // }))

                
            }
           

        })

        // this.checkDate();
        // const data= new FormData(document.getElementById("myForm"));
        if(this.state.search.type === "job") {
            axios.post("https://joblaravel.tbv.cloud/filter",{
                jobType: this.state.jobId,
                jobName: this.state.search.positionName,
                startDate: this.state.search.startDate ?  this.state.search.startDate : null ,
                endDate: this.state.search.endDate ?this.state.search.endDate: this.state.search.customDate,

            },{
                params:{
                    CID: "1",
                  }
            })
               .then(response => {
          console.log(response.data);
          if(response.data)
          {
           
          // this.props.history.push('/dashboard', { logged: 1 })
            
          }
          
        })
        }
        if(this.state.search.type === "intern") {
            axios.post("https://joblaravel.tbv.cloud/filter",{
                jobType:  5,
                jobName: this.state.search.intern,
                startDate: this.state.search.startDate ?  this.state.search.startDate : null ,
                endDate: this.state.search.endDate ?this.state.search.endDate: this.state.search.customDate,
            },  {
                params: {
                    CID: "1",
                  }
            })
               .then(response => {
          console.log(response.data);
          if(response.data)
          {
           
          // this.props.history.push('/dashboard', { logged: 1 })
            
          }
          
        })
            
        }
        // axios.post("https://joblaravel.tbv.cloud/filter", 
        // this.state.search.type === "intern" && {
        //     jobType:  5,
        //     jobName: this.state.search.intern,
        //     startDate: this.state.search.startDate ?  this.state.search.startDate : null ,
        //     endDate: this.state.search.endDate ?this.state.search.endDate: this.state.search.customDate,
        // },
        // {
        //     params: {
        //         CID: "1",
        //       }
        // })
        // .then(response => {
        //   console.log(response.data);
        //   if(response.data)
        //   {
           
        //   // this.props.history.push('/dashboard', { logged: 1 })
            
        //   }
          
        // })
        // .catch (error=>{console.log(error.message)})
    } 

    componentDidMount() {
        axios.get("https://joblaravel.tbv.cloud/jobtypes").then(response => {
                // console.log(response.data);
                this.setState({
                    jobType:  response.data.filter(positionType => positionType.id !== 5)
                    // jobType: response.data.filter(positionType => positionType.id !== 5),
                   })
            });
        axios.get("https://joblaravel.tbv.cloud/jobs",{
            params: {
                cid: "1"
              }
        })
            .then(response => {
                // console.log(response.data)
                this.setState({
                    internName: response.data.filter(intern => {
                        return intern.Job_Type === 5
                    }),
                    JobName: response.data.filter(job => {
                        return job.Job_Type !== 5
                    }),
                })
            })  
            // document.getElementById("myForm").addEventListener("submit", function(e) {
            //     e.stopPropagation();
            //     e.preventDefault();
            //     const data= new FormData(document.getElementById("myForm"));
            //     axios.post("https://joblaravel.tbv.cloud/filter", data,{
            //         params: {
            //             cid: "1",
            //           }
            //     })
            //     .then(response => {
            //       console.log(response.data);
            //       if(response.data)
            //       {
                   
            //       // this.props.history.push('/dashboard', { logged: 1 })
                    
            //       }
                  
            //     })
            //     .catch (error=>{console.log(error.message)})
            // })  
    }

    //Handle all selections 
    handleSelectionChange = (input, e) => {
        let v = e.target.value;
        this.setState(prevState => ({
            ...prevState,
            search:{ 
                ...prevState.search,
                [input]: v
            }
        }))
    }

    //check the date period
    // checkDate = e => {
    //     const start = document.getElementById("startDate");
    //     const end = document.getElementById("endDate");
    //     console.log(end.getTime(),start.getTime())
    //     let diffTime = Math.abs( end - start );
    //     let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        
    //     console.log(diffDays)
    //     if(diffDays > 90) {
    //         // alert(diffDays)
    //         e.preventDefault();
    //     }
    // }

    //toggle between intern and job
    choiceHanlde = e => {
        let v = e.target.value;
        this.setState(prev => ({
            ...prev,
            search:{ 
                ...prev.search,
                type: v,
                positionType: "disabled",
                positionName: "disabled",
                customDate: "disabled",
                intern: "disabled",
                startDate: null,
                endDate: null,
            }
        }));
    }

    //render submit button
    renderSubmitButton = () => (
        <div className="text-center pt-3" >
            <Button variant="primary" type="submit" > Search </Button>
        </div>
    );

    //render options debpend on form control selection name
    renderOptions = ( options ) => (
        
        options.map((option, index) => (
            <option 
                key={`${Math.random()}-${index}`} 
                value={option.value} 
                disabled={ option.value === 'disabled' ? true : null } 
            > 
                { option.name }  
                { option.Name }
                 
            </option>
        ))
    );

    //render Form Group
    renderFormGroup = ( label, value, name, options ) => (
        <Form.Group as={Col} controlId="formGridState">
            <Form.Label> { label } </Form.Label>
            <Form.Control 
                as="select" 
                value={ value } 
                onChange={ this.handleSelectionChange.bind(this, name) } 
                name= { name }
            >
                { this.renderOptions( options ) }          
            </Form.Control>
        </Form.Group>    
    );

    //render start and end date fields
    renderPickDateRange = () => (
        <Form.Group as={Row} >
            { this.renderDateFieldGroup('Start Date', 'startDate')}
            { this.renderDateFieldGroup('End Date', 'endDate') }
        </Form.Group>
    );

    renderDateFieldGroup = (label , id) => (
        <Form.Group as={Col}  controlId="formGridState"  >
            <Form.Label > { label } </Form.Label>
            <Form.Control 
                type="date"   
                controlid={id} 
                required
                onChange={this.handleSelectionChange.bind(this, id)} 
            />
        </Form.Group>
    );
    
    //Render the inter and job toggle buttons
    renderToggleButton = ( type ) => (
        <div className="d-flex flex-column">
            <ButtonGroup toggle className="mt-3, c-width" >
                { this.renderButton("job", "Job", type) }
                { this.renderButton("intern", "Internship", type) }
            </ButtonGroup>
        </div>
    )

    renderButton = (value, name, type) => (
        <ToggleButton 
            type="radio" 
            name="radio" 
            value={value}
            checked={type === value} 
            onChange={ this.choiceHanlde.bind(this) }
        >
            { name }
        </ToggleButton>    
    )

    render() {

        let action;
        //distruct state
        const { jobType, pickDate, internName, JobName } = this.state;
        const { type, positionType, positionName, customDate, intern } = this.state.search;
        // console.log(this.state.internName)
        // console.log(this.state.search.positionType)
        // console.log(this.state.internName)
        // console.log(this.state.search.intern)
        // console.log(this.state.JobName)
        // console.log(JobName.filter(jobs => jobs.Job_Type == 1).map(op => op.Name))
        // console.log(jobType)
        // console.log(this.state.search.startDate,"//",this.state.search.endDate)
        // console.log(customDate)
        // console.log(this.state.search.positionType)
        // console.log(this.state.search.positionName)
        // console.log(this.state.internName)
        if( type === "job" ) {
            action =  (
                <Container  className="respo" >
                    <Form  id="myForm" encType="multipart/form-data" onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Row>
                            { this.renderFormGroup( 'Job Type', positionType, 'positionType', jobType) }
                            { positionType === "Full Time" ? this.renderFormGroup('Full Time -> Available Positions', positionName, 'positionName', JobName.filter(jobs => jobs.Job_Type == 1)) : null }
                            { positionType === "Project" ? this.renderFormGroup('Project -> Available Positions', positionName, 'positionName', JobName.filter(jobs => jobs.Job_Type == 2)) : null }
                            { positionType === "Part Time" ? this.renderFormGroup('Part Time -> Available Positions', positionName, 'positionName', JobName.filter(jobs => jobs.Job_Type == 3)) : null }
                            { positionType === "Freelance" ? this.renderFormGroup('Freelance -> Available Positions', positionName, 'positionName', JobName.filter(jobs => jobs.Job_Type == 4)) : null }
              
                            { this.renderFormGroup( 'Date', customDate, 'customDate', pickDate) }
              
                            {  customDate === "customDate" ? this.renderPickDateRange() : null }    
                        </Form.Row>
                    
                        { this.renderSubmitButton() }
                    </Form>
                </Container>
            );
        }  else if ( type === "intern" ) {
            action = (
                <Container>
                    <Form  id="myForm" encType="multipart/form-data" onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Row>  
                            { this.renderFormGroup("Specialities", intern, "intern", internName) } 
                            { this.renderFormGroup( 'Date',  customDate, 'customDate', pickDate) }
                            { customDate === "customDate" ? this.renderPickDateRange() : null }  
                        </Form.Row>

                        { this.renderSubmitButton() }
                    </Form>
                </Container>
            );
        }

        return (
            <main className="content" >
                <div className="toolbar"/>
                <Container >
                    { this.renderToggleButton( type ) }
                   {/* <form  id="myForm" encType="multipart/form-data"> */}
                    { action }
                    {/* </form> */}
                </Container>
            </main>          
        );
    }
}