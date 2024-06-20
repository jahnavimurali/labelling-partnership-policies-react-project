import React, { useState, useEffect } from 'react';
import {compareDateTime, compareCount, compareInterval, comparePayAmount, compareSpatial} from './PolicyManagers';

// Policy class
class Policy {
  constructor(target, action, leftOperand, operator, rightOperand) {
    this.target = target;
    this.action = action;
    this.leftOperand = leftOperand;
    this.operator = operator;
    this.rightOperand = rightOperand;
  }

  toString() {
    return `target=${this.target}, \naction=${this.action},\nleftOperand=${this.leftOperand}, \noperator=${this.operator},\nrightOperand=${this.rightOperand}`;
  }

  toShortString() {
    return `operator=${this.operator},\nrightOperand=${this.rightOperand}`;
  }
}

// Function to fetch and parse policies from JSON
const fetchAndParsePolicies = async (path) => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error('Failed to fetch policies');
    }
    const data = await response.json();
    return parsePolicies(data);
  } catch (error) {
    throw error;
  }
};

// Function to parse policies from raw data
const parsePolicies = (data) => {
  const policies = [];

  data.forEach((policy) => {
    policy.permission.forEach((permission) => {
      const target = permission.target;
      permission.duty.forEach((duty) => {
        duty.action.forEach((action) => {
          const act = action['rdf:value']['@id'];
          action.refinement.forEach((ref) => {
            const leftOperand = ref.leftOperand;
            const operator = ref.operator;
            const rightOperand = ref.rightOperand;
            policies.push(new Policy(target, act, leftOperand, operator, rightOperand));
          });
        });
      });
    });
  });

  return policies;
};

const comparePairPolicies = async (LP1, LP2, PP1, PP2)=>{
  let conflict = '';
  try{
    conflict = await compareInterval(LP1, LP2, PP1, PP2)
    console.log(`Local Policy : ${LP1.toString()}`);
    console.log(LP2.toShortString())
    console.log(`Partnership Policy : ${PP1.toString()}`);
    console.log(PP2.toShortString())
    console.log(conflict);
    return conflict;
  }catch (error) {
    console.error('Error comparing policies:', error);
  }
}

// Function to compare policies based on their type
const comparePolicies = async (LP, PP) => {
  let conflict = '';

  try {
    if ((PP.target==LP.target)&&(PP.leftOperand==LP.leftOperand)){
      if (PP.leftOperand === 'dateTime') {
        conflict = await compareDateTime(LP, PP);
      } else if (PP.leftOperand === 'count') {
        conflict = await compareCount(LP, PP);
      } else if (PP.leftOperand === 'spatial') {
        conflict = await compareSpatial(LP, PP);
      } else if (PP.leftOperand === 'payAmount'){
        conflict = await comparePayAmount(LP, PP)
      }
      else {
        console.log(`Unsupported policy type: ${LP.leftOperand}`);
        return;
      }
  }
    console.log(`Local Policy : ${LP.toString()}`);
    console.log(`Partnership Policy : ${PP.toString()}`);
    console.log(conflict);
    return conflict;
  } catch (error) {
    console.error('Error comparing policies:', error);
  }
};

// Manager Component
const Manager = () => {
  const [localPolicies, setLocalPolicies] = useState([]);
  const [partnershipPolicies, setPartnershipPolicies] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const localPoliciesData = await fetchAndParsePolicies('/odrl/LocalPolicies.json');
      const partnershipPoliciesData = await fetchAndParsePolicies('/odrl/PartnershipPolicies.json');
      console.log("HELLO ", localPoliciesData)
      console.log("WORLD ", partnershipPoliciesData)

      setLocalPolicies(localPoliciesData);
      setPartnershipPolicies(partnershipPoliciesData);
    } catch (error) {
      setError(error.message);
    }
  };

  const compare = () => {
    for(let i=0;i<partnershipPolicies.length;i++) {
      let PP = partnershipPolicies[i]
      if (!PP.leftOperand === "dateTime") {
        localPolicies.forEach(LP => {
          comparePolicies(LP, PP);
        });
      }
      else if(i === partnershipPolicies.length - 1) {
        localPolicies.forEach(LP => {
          comparePolicies(LP, PP);
        });
      }
      else if(!partnershipPolicies[i + 1].leftOperand === "dateTime") {
        localPolicies.forEach(LP => {
          comparePolicies(LP, PP);
        });
      }

      else {
        for (let j = 0; j < localPolicies.length; j++) {
          if (localPolicies[j].leftOperand === "dateTime" && localPolicies[j + 1].leftOperand === "dateTime") {
            comparePairPolicies(localPolicies[j], localPolicies[j + 1], PP, partnershipPolicies[i + 1]);
            i++;
            break;
          }
          else{
            comparePolicies(localPolicies[j], PP)
          } 
        }
      }
    }}
  
  const handleSubmit = async () =>{
    await fetchData();
    await compare();
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Policy Comparison Results</h2>
      <input type = 'submit' value = 'Submit' onClick={()=>handleSubmit()}/>
    </div>
  );
};

export default Manager;
