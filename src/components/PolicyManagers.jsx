// all required comparison functionalities

export const getAllenRelation = (start1, end1, start2, end2) => {
    // Convert dates to timestamps for easier comparison
    const s1 = start1.getTime();
    const e1 = end1.getTime();
    const s2 = start2.getTime();
    const e2 = end2.getTime();

    // Implementation of all 13 Allen's relations
    if (s1 === s2 && e1 === e2) {
        return "EQUAL";
    } else if (e1 < s2) {
        return "BEFORE";
    } else if (e1 === s2) {
        return "MEETS";
    } else if (s1 > s2 && e1 < e2) {
        return "DURING";
    } else if (s1 < s2 && e1 > e2) {
        return "CONTAINS";
    } else if (s1 === s2 && e1 < e2) {
        return "STARTS";
    } else if (s1 === s2 && e1 > e2) {
        return "STARTED_BY";
    } else if (s1 > s2 && e1 === e2) {
        return "FINISHES";
    } else if (s1 < s2 && e1 === e2) {
        return "FINISHED_BY";
    } else if (s1 < s2 && e1 < e2 && e1 > s2) {
        return "OVERLAPS";
    } else if (s1 > s2 && e1 > e2 && s1 < e2) {
        return "OVERLAPPED_BY";
    } else if (s2 < s1) {
        return "AFTER";
    } else if (s2 === e1) {
        return "MET_BY";
    }
    return "UNKNOWN";
};

// Enhanced interval comparison incorporating Allen's relations


export const compareCount = (LP, PP) => {
    let label = "";
    const pp = parseInt(PP.rightOperand);
    const lp = parseInt(LP.rightOperand);

    if ((LP.operator === "gt" || LP.operator === "gteq") && (PP.operator === "gt" || PP.operator === "gteq")) {
        if (lp === pp) {
            label = "Neutral: Both policies have the same count.";
        } else if (pp > lp) {
            label = "Opposing: Partnership policy has a higher count.";
        } else if (pp < lp) {
            label = "Supportive: Partnership policy has a lower count.";
        }
    } else if ((LP.operator === "lt" || LP.operator === "lteq") && (PP.operator === "lt" || PP.operator === "lteq")) {
        if (lp === pp) {
            label = "Neutral: Both policies have the same count.";
        } else if (pp > lp) {
            label = "Supportive: Partnership policy has a higher count.";
        } else if (pp < lp) {
            label = "Opposing: Partnership policy has a lower count.";
        }
    } else if (LP.operator === "eq" && PP.operator === "eq") {
        if (pp === lp) {
            label = "Neutral: Both policies have the same count.";
        } else {
            label = "Cannot be labelled: The policies have different counts.";
        }
    } else if (LP.operator === "gt" && PP.operator === "eq") {
        if (pp > lp) {
            label = "Opposing: Partnership policy has a higher count.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different count.";
        }
    } else if (LP.operator === "gteq" && PP.operator === "eq") {
        if (pp >= lp) {
            label = "Opposing: Partnership policy has a higher or equal count.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different count.";
        }
    } else if (PP.operator === "gt" && LP.operator === "eq") {
        if (pp < lp) {
            label = "Supportive: Partnership policy has a lower count.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different count.";
        }
    } else if (PP.operator === "gteq" && LP.operator === "eq") {
        if (pp <= lp) {
            label = "Supportive: Partnership policy has a lower or equal count.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different count.";
        }
    } else if (LP.operator === "lt" && PP.operator === "eq") {
        if (pp < lp) {
            label = "Opposing: Partnership policy has a lower count.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different count.";
        }
    } else if (LP.operator === "lteq" && PP.operator === "eq") {
        if (pp <= lp) {
            label = "Opposing: Partnership policy has a lower or equal count.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different count.";
        }
    } else if (PP.operator === "lt" && LP.operator === "eq") {
        if (pp > lp) {
            label = "Supportive: Partnership policy has a higher count.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different count.";
        }
    } else if (PP.operator === "lteq" && LP.operator === "eq") {
        if (pp >= lp) {
            label = "Supportive: Partnership policy has a higher or equal count.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different count.";
        }
    } else if (LP.operator === "ne" && PP.operator === "ne") {
        label = "Neutral: Both policies have different counts.";
    } else if (LP.operator === "gteq" && PP.operator === "lteq") {
        if (pp >= lp) {
            label = "Partially supportive/opposing: Partnership policy has a higher or equal count.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different count.";
        }
    } else if ((LP.operator === "gt" || LP.operator === "gteq") && (PP.operator === "lt" || PP.operator === "lteq")) {
        if (pp > lp) {
            label = "Partially supportive/opposing: Partnership policy has a higher count.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different count.";
        }
    } else if (LP.operator === "lteq" && PP.operator === "gteq") {
        if (pp <= lp) {
            label = "Partially supportive/opposing: Partnership policy has a lower or equal count.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different count.";
        }
    } else if ((LP.operator === "lt" || LP.operator === "lteq") && (PP.operator === "gt" || PP.operator === "gteq")) {
        if (pp < lp) {
            label = "Partially supportive/opposing: Partnership policy has a lower count.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different count.";
        }
    } else if (LP.operator === "eq" && PP.operator === "ne") {
        if (pp !== lp) {
            label = "Supportive: Partnership policy has a different count.";
        } else {
            label = "Cannot be labelled: Partnership policy has the same count.";
        }
    } else if (PP.operator === "eq" && LP.operator === "ne") {
        if (pp !== lp) {
            label = "Opposing: Partnership policy has a different count.";
        } else {
            label = "Cannot be labelled: Partnership policy has the same count.";
        }
    }

    return label;
};


  
export const comparePayAmount = (LP, PP) => {
    let label = "";
    const pp = parseInt(PP.rightOperand);
    const lp = parseInt(LP.rightOperand);

    if ((LP.operator === "gt" || LP.operator === "gteq") && (PP.operator === "gt" || PP.operator === "gteq")) {
        if (lp === pp) {
            label = "Neutral: Both policies have the same payment amount.";
        } else if (pp > lp) {
            label = "Opposing: Partnership policy has a higher payment amount.";
        } else if (pp < lp) {
            label = "Supportive: Partnership policy has a lower payment amount.";
        }
    } else if ((LP.operator === "lt" || LP.operator === "lteq") && (PP.operator === "lt" || PP.operator === "lteq")) {
        if (lp === pp) {
            label = "Neutral: Both policies have the same payment amount.";
        } else if (pp > lp) {
            label = "Supportive: Partnership policy has a higher payment amount.";
        } else if (pp < lp) {
            label = "Opposing: Partnership policy has a lower payment amount.";
        }
    } else if (LP.operator === "eq" && PP.operator === "eq") {
        if (pp === lp) {
            label = "Neutral: Both policies have the same payment amount.";
        } else {
            label = "Cannot be labelled: The policies have different payment amounts.";
        }
    } else if (LP.operator === "gt" && PP.operator === "eq") {
        if (pp > lp) {
            label = "Opposing: Partnership policy has a higher payment amount.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different payment amount.";
        }
    } else if (LP.operator === "gteq" && PP.operator === "eq") {
        if (pp >= lp) {
            label = "Opposing: Partnership policy has a higher or equal payment amount.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different payment amount.";
        }
    } else if (PP.operator === "gt" && LP.operator === "eq") {
        if (pp < lp) {
            label = "Supportive: Partnership policy has a lower payment amount.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different payment amount.";
        }
    } else if (PP.operator === "gteq" && LP.operator === "eq") {
        if (pp <= lp) {
            label = "Supportive: Partnership policy has a lower or equal payment amount.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different payment amount.";
        }
    } else if (LP.operator === "lt" && PP.operator === "eq") {
        if (pp < lp) {
            label = "Opposing: Partnership policy has a lower payment amount.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different payment amount.";
        }
    } else if (LP.operator === "lteq" && PP.operator === "eq") {
        if (pp <= lp) {
            label = "Opposing: Partnership policy has a lower or equal payment amount.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different payment amount.";
        }
    } else if (PP.operator === "lt" && LP.operator === "eq") {
        if (pp > lp) {
            label = "Supportive: Partnership policy has a higher payment amount.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different payment amount.";
        }
    } else if (PP.operator === "lteq" && LP.operator === "eq") {
        if (pp >= lp) {
            label = "Supportive: Partnership policy has a higher or equal payment amount.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different payment amount.";
        }
    } else if (LP.operator === "ne" && PP.operator === "ne") {
        label = "Neutral: Both policies have different payment amounts.";
    } else if (LP.operator === "gteq" && PP.operator === "lteq") {
        if (pp >= lp) {
            label = "Partially supportive/opposing: Partnership policy has a higher or equal payment amount.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different payment amount.";
        }
    } else if ((LP.operator === "gt" || LP.operator === "gteq") && (PP.operator === "lt" || PP.operator === "lteq")) {
        if (pp > lp) {
            label = "Partially supportive/opposing: Partnership policy has a higher payment amount.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different payment amount.";
        }
    } else if (LP.operator === "lteq" && PP.operator === "gteq") {
        if (pp <= lp) {
            label = "Partially supportive/opposing: Partnership policy has a lower or equal payment amount.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different payment amount.";
        }
    } else if ((LP.operator === "lt" || LP.operator === "lteq") && (PP.operator === "gt" || PP.operator === "gteq")) {
        if (pp < lp) {
            label = "Partially supportive/opposing: Partnership policy has a lower payment amount.";
        } else {
            label = "Cannot be labelled: Partnership policy has a different payment amount.";
        }
    } else if (LP.operator === "eq" && PP.operator === "ne") {
        if (pp !== lp) {
            label = "Supportive: Partnership policy has a different payment amount.";
        } else {
            label = "Cannot be labelled: Partnership policy has the same payment amount.";
        }
    } else if (PP.operator === "eq" && LP.operator === "ne") {
        if (pp !== lp) {
            label = "Opposing: Partnership policy has a different payment amount.";
        } else {
            label = "Cannot be labelled: Partnership policy has the same payment amount.";
        }
    }

    return label;
};

  
export const compareDateTime = (LP, PP) => {
    let label = "";
    const pp = new Date(PP.rightOperand);
    const lp = new Date(LP.rightOperand);

    if ((LP.operator === "gt" || LP.operator === "gteq") && (PP.operator === "gt" || PP.operator === "gteq")) {
        if (lp.getTime() === pp.getTime()) {
            label = "Neutral: Both policies are effective from the same date.";
        } else if (pp > lp) {
            label = "Opposing: Partnership policy starts after the local policy.";
        } else if (pp < lp) {
            label = "Supportive: Partnership policy starts before the local policy.";
        }
    } else if ((LP.operator === "lt" || LP.operator === "lteq") && (PP.operator === "lt" || PP.operator === "lteq")) {
        if (lp.getTime() === pp.getTime()) {
            label = "Neutral: Both policies are effective until the same date.";
        } else if (pp > lp) {
            label = "Supportive: Partnership policy ends after the local policy.";
        } else if (pp < lp) {
            label = "Opposing: Partnership policy ends before the local policy.";
        }
    } else if (LP.operator === "eq" && PP.operator === "eq") {
        if (pp.getTime() === lp.getTime()) {
            label = "Neutral: Both policies are effective on the same date.";
        } else {
            label = "Cannot be labelled: The policies have different effective dates.";
        }
    } else if (LP.operator === "gt" && PP.operator === "eq") {
        if (pp > lp) {
            label = "Opposing: Partnership policy starts after the local policy's date.";
        } else {
            label = "Cannot be labelled: Partnership policy starts on a different date.";
        }
    } else if (LP.operator === "gteq" && PP.operator === "eq") {
        if (pp >= lp) {
            label = "Opposing: Partnership policy starts on or after the local policy's date.";
        } else {
            label = "Cannot be labelled: Partnership policy starts on a different date.";
        }
    } else if (PP.operator === "gt" && LP.operator === "eq") {
        if (pp < lp) {
            label = "Supportive: Partnership policy starts before the local policy's date.";
        } else {
            label = "Cannot be labelled: Partnership policy starts on a different date.";
        }
    } else if (PP.operator === "gteq" && LP.operator === "eq") {
        if (pp <= lp) {
            label = "Supportive: Partnership policy starts on or before the local policy's date.";
        } else {
            label = "Cannot be labelled: Partnership policy starts on a different date.";
        }
    } else if (LP.operator === "lt" && PP.operator === "eq") {
        if (pp < lp) {
            label = "Opposing: Partnership policy ends before the local policy's date.";
        } else {
            label = "Cannot be labelled: Partnership policy ends on a different date.";
        }
    } else if (LP.operator === "lteq" && PP.operator === "eq") {
        if (pp <= lp) {
            label = "Opposing: Partnership policy ends on or before the local policy's date.";
        } else {
            label = "Cannot be labelled: Partnership policy ends on a different date.";
        }
    } else if (PP.operator === "lt" && LP.operator === "eq") {
        if (pp > lp) {
            label = "Supportive: Partnership policy ends after the local policy's date.";
        } else {
            label = "Cannot be labelled: Partnership policy ends on a different date.";
        }
    } else if (PP.operator === "lteq" && LP.operator === "eq") {
        if (pp >= lp) {
            label = "Supportive: Partnership policy ends on or after the local policy's date.";
        } else {
            label = "Cannot be labelled: Partnership policy ends on a different date.";
        }
    } else if (LP.operator === "ne" && PP.operator === "ne") {
        label = "Neutral: Both policies are effective on different dates.";
    } else if (LP.operator === "gteq" && PP.operator === "lteq") {
        if (pp >= lp) {
            label = "Partially supportive/opposing: Partnership policy starts on or after, and ends on or before the local policy's date.";
        } else {
            label = "Cannot be labelled: Partnership policy dates do not align with the local policy.";
        }
    } else if ((LP.operator === "gt" || LP.operator === "gteq") && (PP.operator === "lt" || PP.operator === "lteq")) {
        if (pp > lp) {
            label = "Partially supportive/opposing: Partnership policy starts after, and ends before the local policy's date.";
        } else {
            label = "Cannot be labelled: Partnership policy dates do not align with the local policy.";
        }
    } else if (LP.operator === "lteq" && PP.operator === "gteq") {
        if (pp <= lp) {
            label = "Partially supportive/opposing: Partnership policy starts on or before, and ends on or after the local policy's date.";
        } else {
            label = "Cannot be labelled: Partnership policy dates do not align with the local policy.";
        }
    } else if ((LP.operator === "lt" || LP.operator === "lteq") && (PP.operator === "gt" || PP.operator === "gteq")) {
        if (pp < lp) {
            label = "Partially supportive/opposing: Partnership policy starts before, and ends after the local policy's date.";
        } else {
            label = "Cannot be labelled: Partnership policy dates do not align with the local policy.";
        }
    } else if (LP.operator === "eq" && PP.operator === "ne") {
        if (pp.getTime() !== lp.getTime()) {
            label = "Supportive: Partnership policy is effective on a different date.";
        } else {
            label = "Cannot be labelled: Partnership policy dates align with the local policy.";
        }
    } else if (PP.operator === "eq" && LP.operator === "ne") {
        if (pp.getTime() !== lp.getTime()) {
            label = "Opposing: Partnership policy is effective on a different date.";
        } else {
            label = "Cannot be labelled: Partnership policy dates align with the local policy.";
        }
    }

    return label;
};

export const compareInterval = (LP1, LP2, PP1, PP2) => {
    let label = "";
    
    const blp = new Date(LP1.rightOperand);
    const elp = new Date(LP2.rightOperand);
    const bpp = new Date(PP1.rightOperand);
    const epp = new Date(PP2.rightOperand);

    const allenRelation = getAllenRelation(blp, elp, bpp, epp);
    
    
    // Map Allen's relations to policy comparison labels
    switch (allenRelation) {
        case "EQUAL":
            label = "'EQUAL - Neutral: The intervals of both policies are identical.";
            break;
        case "DURING":
            label = "'DURING' - Opposing: The local policy interval falls completely within the partnership policy interval.";
            break;
        case "CONTAINS":
            label = "'CONTAINS' - Supportive: The partnership policy interval falls completely within the local policy interval.";
            break;
        case "STARTS":
        case "STARTED_BY":
            label = "'STARTS or STARTED BY' - Partially supportive/opposing: Policies start together but have different end points.";
            break;
        case "FINISHES":
        case "FINISHED_BY":
            label = "'FINISHES or  FINISHED BY' - Partially supportive/opposing: Policies end together but have different start points.";
            break;
        case "OVERLAPS":
        case "OVERLAPPED_BY":
            label = "OVERLAPS or OVERLAPPED_BY - Partially supportive/opposing: The intervals partially overlap.";
            break;
        case "BEFORE":
        case "AFTER":
        case "MEETS":
        case "MET_BY":
            label = "BEFORE AFTER MEETS OR MET BY - Cannot be labelled: The intervals do not overlap.";
            break;
        default:
            label = "Cannot be labelled: Unable to determine temporal relationship.";
    }
    console.log(label,allenRelation)
    
    return {
        label: label,
        allenRelation: allenRelation, // Including the specific Allen relation for more detailed analysis if needed
    };
}; 
// export const compareInterval = (LP1, LP2, PP1, PP2) => {
//     let label = "";

//     const blp = new Date(LP1.rightOperand);
//     const elp = new Date(LP2.rightOperand);
//     const bpp = new Date(PP1.rightOperand);
//     const epp = new Date(PP2.rightOperand);

//     const lp = { start: blp, end: elp };
//     const pp = { start: bpp, end: epp };

//     if (lp.start.getTime() === pp.start.getTime() && lp.end.getTime() === pp.end.getTime()) {
//         label = "Neutral: The intervals of both policies are identical.";
//     } else if (elp <= bpp || elp.getTime() === bpp.getTime() || epp <= blp || epp.getTime() === blp.getTime()) {
//         label = "Cannot be labelled: The intervals do not overlap.";
//     } else if (bpp <= blp && epp >= elp) {
//         label = "Supportive: The partnership policy covers the entire interval of the local policy.";
//     } else if (blp <= bpp && elp >= epp) {
//         label = "Opposing: The local policy covers the entire interval of the partnership policy.";
//     } else if (blp.getTime() === bpp.getTime() && elp < epp) {
//         label = "Supportive: Both policies start at the same time, but the partnership policy extends longer.";
//     } else if (blp.getTime() === bpp.getTime() && epp < elp) {
//         label = "Opposing: Both policies start at the same time, but the local policy extends longer.";
//     } else if (elp.getTime() === epp.getTime() && blp > bpp) {
//         label = "Supportive: Both policies end at the same time, but the partnership policy starts earlier.";
//     } else if (elp.getTime() === epp.getTime() && blp < bpp) {
//         label = "Opposing: Both policies end at the same time, but the local policy starts earlier.";
//     } else if ((blp < epp && elp > bpp) || (bpp < elp && epp > blp)) {
//         label = "Partially supportive/opposing: The intervals overlap but do not fully encompass each other.";
//     }

//     return label;
// };


export const compareGeoDataSpatial = async (LP, PP) => {
    let label = "";


    try {
        const dataLP = await getGeodata(LP.rightOperand);
        const dataPP = await getGeodata(PP.rightOperand);

        const iscountryLP = dataLP.fcodeName === "independent political entity";
        const iscountryPP = dataPP.fcodeName === "independent political entity";

        if (LP.rightOperand === PP.rightOperand) {
            label = "Neutral: Policies target the same region.";
        } else if (iscountryLP && iscountryPP) {
            label = "Cannot be labelled: Both policies target independent countries, making a direct comparison difficult.";
        } else if (iscountryLP) {
            if (dataPP.countryName === LP.rightOperand) {
                label = "Opposing: Local policy targets the country, while the partnership policy targets a region within the same country.";
            } else {
                label = "Cannot be labelled: Local policy targets a country, but the partnership policy targets a different region.";
            }
        } else if (iscountryPP) {
            if (dataLP.countryName === PP.rightOperand) {
                label = "Supportive: Partnership policy targets the country, while the local policy targets a region within the same country.";
            } else {
                label = "Cannot be labelled: Partnership policy targets a country, but the local policy targets a different region.";
            }
        } else {
            if (dataLP.name === dataPP.name) {
                label = "Neutral: Both policies target the same region.";
            } else {
                label = "Cannot be labelled: Policies target different regions.";
            }
        }
    } catch (error) {
        console.error("Error fetching geodata:", error);
        label = "Cannot be labelled: Unable to determine policy relationship due to data retrieval error.";
    }

    return label;
};

export const compareSpatial = async(LP, PP) =>{
    let label = ""

    try {
        const dataLP = await getWikiGeoData(LP.rightOperand);
        const dataPP = await getWikiGeoData(PP.rightOperand);

        const iscountryLP = dataLP.type == "country";
        const iscountryPP = dataPP.type == "country";

        if (LP.rightOperand == PP.rightOperand) {
            label = "Neutral: Policies target the same region.";
        } else if (iscountryLP && iscountryPP) {
            label = "Cannot be labelled: Both policies target independent countries, making a direct comparison difficult.";
        } else if (iscountryLP) {
            if (dataPP.country === LP.rightOperand) {
                label = "Opposing: Local policy targets the country, while the partnership policy targets a region within the same country.";
            } else {
                label = "Cannot be labelled: Local policy targets a country, but the partnership policy targets a different region.";
            }
        } else if (iscountryPP) {
            if (dataLP.country === PP.rightOperand) {
                label = "Supportive: Partnership policy targets the country, while the local policy targets a region within the same country.";
            } else {
                label = "Cannot be labelled: Partnership policy targets a country, but the local policy targets a different region.";
            }
        } else {
            if (dataLP.name === dataPP.name) {
                label = "Neutral: Both policies target the same region.";
            } else {
                label = "Cannot be labelled: Policies target different regions.";
            }
        }
    } catch (error) {
        console.error("Error fetching geodata:", error);
        label = "Cannot be labelled: Unable to determine policy relationship due to data retrieval error.";
    }

    return label;
}


const getGeodata = async (searchQuery) => {
    const username = "aathish2110240";
    const url = `http://api.geonames.org/searchJSON?q=${searchQuery}&maxRows=1&username=${username}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.geonames && data.geonames.length > 0) {
            return data.geonames[0];
        } else {
            throw new Error("No geonames data found");
        }
    } catch (error) {
        console.error("Error fetching geodata:", error);
        throw error;
    }
}

const getWikiGeoData = async (searchQuery) => {
    const query = `
    SELECT ?entity ?entityLabel ?instanceOf ?instanceOfLabel ?country ?countryLabel WHERE {
      ?entity rdfs:label "${searchQuery}"@en.
      ?entity wdt:P31 ?instanceOf.
      OPTIONAL { ?entity wdt:P17 ?country. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    }
    `;

    const url = new URL('https://query.wikidata.org/sparql');
    url.searchParams.set('query', query);
    url.searchParams.set('format', 'json');

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const results = data.results.bindings;

        if (results.length > 0) {
            const result = results[0];
            const locationInfo = {
                name: result.entityLabel ? result.entityLabel.value : 'Unknown',
                type: result.instanceOfLabel ? result.instanceOfLabel.value : 'Unknown',
                country: result.countryLabel ? result.countryLabel.value : 'Unknown'
            };
            return locationInfo;
        } else {
            return { error: 'No results found' };
        }
    } catch (error) {
        console.error(`Error fetching location info from Wikidata: ${error}`);
        return { error: 'Failed to retrieve data' };
    }
}


