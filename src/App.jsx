import './App.css'
import React, { useState, useEffect } from 'react';
import { compareDateTime, compareCount, compareInterval, comparePayAmount, compareSpatial } from './components/PolicyManagers';

function formatISODate(isoDate) {
  const date = new Date(isoDate);

  // Options for formatting
  const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
  };

  return date.toLocaleString('en-US', options);
}


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
    let op = ''
    if(this.operator === 'eq') op = '='
    else if(this.operator === 'lt') op = '<'
    else if(this.operator === 'lteq') op = '<='
    else if(this.operator === 'gt') op = '>'
    else if(this.operator === 'gteq') op = '>='
    else op = this.operator

    if(this.leftOperand==='dateTime'){
      const date = formatISODate(this.rightOperand)
      return `${this.leftOperand} ${op} ${date}\n`
    }
    return `${this.leftOperand} ${op} ${this.rightOperand}\n`;
  }
}

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

const comparePairPolicies = async (LP1, LP2, PP1, PP2) => {
  let conflict = '';
  console.log("hi");
  try {
    conflict = await compareInterval(LP1, LP2, PP1, PP2);
    return {
      localPolicy: LP1.toShortString() + 'and ' + LP2.toShortString(),
      partnershipPolicy: PP1.toShortString() + 'and ' + PP2.toShortString(),
      relationship: conflict
    }
  } catch (error) {
    console.error('Error comparing policies:', error);
    return null
  }
};

const comparePolicies = async (LP, PP) => {
  let conflict = '';

  try {
    if (PP.target === LP.target && PP.leftOperand === LP.leftOperand) {
      if (PP.leftOperand === 'dateTime') {
        conflict = await compareDateTime(LP, PP);
      } else if (PP.leftOperand === 'count') {
        conflict = await compareCount(LP, PP);
      } else if (PP.leftOperand === 'spatial') {
        conflict = await compareSpatial(LP, PP);
      } else if (PP.leftOperand === 'payAmount') {
        conflict = await comparePayAmount(LP, PP);
      } 
      // else {
      //   console.log(`Unsupported policy type: ${LP.leftOperand}`);
      //   return;
      // }
      
      // debug print statements
      // console.log(`Local Policy : ${LP.toString()}`);
      // console.log(`Partnership Policy : ${PP.toString()}`);
      // console.log(conflict);

      return {
        localPolicy: LP.toShortString(),
        partnershipPolicy: PP.toShortString(),
        relationship: conflict
      }
    }
    else {
      console.log("Targets/Operators do not match.")
      return null
    }
  } catch (error) {
    console.error('Error comparing policies:', error);
    return null
  }
};

const App=()=>{

  const [localPolicies, setLocalPolicies] = useState([]);
  const [partnershipPolicies, setPartnershipPolicies] = useState([]);
  const [error, setError] = useState(null);
  const [comparisonResults, setComparisonResults] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e, setPolicies) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const policies = parsePolicies(json);
        setPolicies(policies);
      } catch (error) {
        setError('Invalid JSON file');
      }
    };

    reader.readAsText(file);
  };

  const compare = async () => {
    let results = [];
    console.log("BP -1");
  
    for (let i = 0; i < partnershipPolicies.length; i++) {
      console.log("BP -2");
      let PP = partnershipPolicies[i];
  
      if (PP.leftOperand !== "dateTime") {
        for (let LP of localPolicies) {
          const result = await comparePolicies(LP, PP);
          if (result != null) results.push(result);
        }
      } 
      else if (i === partnershipPolicies.length - 1) {
        for (let LP of localPolicies) {
          console.log("BP -3");
          const result = await comparePolicies(LP, PP);
          if (result != null) results.push(result);
        }
      } 
      else if (partnershipPolicies[i + 1].leftOperand !== "dateTime") {
        for (let LP of localPolicies) {
          const result = await comparePolicies(LP, PP);
          if (result != null) results.push(result);
        }
      } else {
        console.log("BP - 4")
        for (let j = 0; j < localPolicies.length; j++) {
          if (localPolicies[j].leftOperand === "dateTime" && localPolicies[j + 1].leftOperand === "dateTime") {
            const result = await comparePairPolicies(localPolicies[j], localPolicies[j + 1], PP, partnershipPolicies[i + 1]);
            if (result != null) results.push(result);
            i++;
            break;
          } else {
            const result = await comparePolicies(localPolicies[j], PP);
            if (result != null) results.push(result);
          }
        }
      }
    }
  
    setComparisonResults(results);
  };
  
  const handleSubmit = async () => {
    setComparisonResults(null);
    await compare(); 
  };
  

  return (
    <div className="container">
      <h2>Labelling Policies</h2>
      <div className="file-input-group">
        <label>Local Policies ODRL File:</label>
        <input type="file" accept=".json" onChange={(e) => handleFileChange(e, setLocalPolicies)} />
      </div>
      <div className="file-input-group">
        <label>Partnership Policies ODRL File:</label>
        <input type="file" accept=".json" onChange={(e) => handleFileChange(e, setPartnershipPolicies)} />
      </div>
      <div className="submit-button">
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </div>
  
      {comparisonResults && (
        <div className="results-table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Local Policy</th>
                <th>Partnership Policy</th>
                <th>Relationship</th>
                <th>Allen Relation</th>
              </tr>
            </thead>
            <tbody>
              {comparisonResults.map((result, index) => (
                <tr key={index}>
                  {/* <td>{JSON.stringify(result)}</td> */}
                  <td>{result.localPolicy}</td>
                  <td>{result.partnershipPolicy}</td>
                  {result.relationship.label ? <td>{result.relationship.label}</td> :<td>{result.relationship}</td>  }
                  {result.relationship.allenRelation ? <td>{result.relationship.allenRelation}</td> : <td>Not Relevant</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );  
}

export default App
