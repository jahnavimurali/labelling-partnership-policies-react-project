import React, { useState, useEffect } from 'react';
import { compareDateTime, compareCount, compareInterval, comparePayAmount, compareSpatial } from './PolicyManagers';

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

const comparePairPolicies = async (LP1, LP2, PP1, PP2) => {
  let conflict = '';
  try {
    conflict = await compareInterval(LP1, LP2, PP1, PP2);
    console.log(`Local Policy : ${LP1.toString()}`);
    console.log(LP2.toShortString());
    console.log(`Partnership Policy : ${PP1.toString()}`);
    console.log(PP2.toShortString());
    console.log(conflict);
    return conflict;
  } catch (error) {
    console.error('Error comparing policies:', error);
  }
};

// Function to compare policies based on their type
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
      } else {
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

  const compare = () => {
    for (let i = 0; i < partnershipPolicies.length; i++) {
      let PP = partnershipPolicies[i];
      if (PP.leftOperand !== "dateTime") {
        localPolicies.forEach(LP => {
          comparePolicies(LP, PP);
        });
      } else if (i === partnershipPolicies.length - 1) {
        localPolicies.forEach(LP => {
          comparePolicies(LP, PP);
        });
      } else if (partnershipPolicies[i + 1].leftOperand !== "dateTime") {
        localPolicies.forEach(LP => {
          comparePolicies(LP, PP);
        });
      } else {
        for (let j = 0; j < localPolicies.length; j++) {
          if (localPolicies[j].leftOperand === "dateTime" && localPolicies[j + 1].leftOperand === "dateTime") {
            comparePairPolicies(localPolicies[j], localPolicies[j + 1], PP, partnershipPolicies[i + 1]);
            i++;
            break;
          } else {
            comparePolicies(localPolicies[j], PP);
          }
        }
      }
    }
  };

  const handleSubmit = async () => {
    compare();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

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
    </div>
  )
}

export default Manager;
