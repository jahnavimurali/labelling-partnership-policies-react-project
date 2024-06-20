// all required comparison functionalities
export const compareCount = (LP, PP) => {
    let label = "";
    const pp = parseInt(PP.rightOperand);
    const lp = parseInt(LP.rightOperand);
    if ((LP.operator === "gt" || LP.operator === "gteq") && (PP.operator === "gt" || PP.operator === "gteq")) {
        if (lp === pp) {
            label = "Neutral";
        } else if (pp > lp) {
            label = "Opposing";
        } else if (pp < lp) {
            label = "Supportive";
        }
    } else if ((LP.operator === "lt" || LP.operator === "lteq") && (PP.operator === "lt" || PP.operator === "lteq")) {
        if (lp === pp) {
            label = "Neutral";
        } else if (pp > lp) {
            label = "Supportive";
        } else if (pp < lp) {
            label = "Opposing";
        }
    } else if (LP.operator === "ep" && PP.operator === "eq") {
        if (pp === lp)
            label = "Neutral";
        else
            label = "Cannot be labelled";
    } else if (LP.operator === "gt" && PP.operator === "eq") {
        if (pp > lp)
            label = "Opposing";
        else
            label = "Cannot be labelled";
    } else if (LP.operator === "gteq" && PP.operator === "eq") {
        if (pp >= lp)
            label = "Opposing";
        else
            label = "Cannot be labelled";
    } else if (PP.operator === "gt" && LP.operator === "eq") {
        if (pp < lp)
            label = "Supportive";
        else
            label = "Cannot be labelled";
    } else if (PP.operator === "gteq" && LP.operator === "eq") {
        if (pp <= lp)
            label = "Supportive";
        else
            label = "Cannot be labelled";
    } else if (LP.operator === "lt" && PP.operator === "eq") {
        if (pp < lp)
            label = "Opposing";
        else
            label = "Cannot be labelled";
    } else if (LP.operator === "lteq" && PP.operator === "eq") {
        if (pp <= lp)
            label = "Opposing";
        else
            label = "Cannot be labelled";
    } else if (PP.operator === "lt" && LP.operator === "eq") {
        if (pp > lp)
            label = "Supportive";
        else
            label = "Cannot be labelled";
    } else if (PP.operator === "lteq" && LP.operator === "eq") {
        if (pp >= lp)
            label = "Supportive";
        else
            label = "Cannot be labelled";
    } else if (LP.operator === "nep" && PP.operator === "neq") {
        label = "Neutral";
    } else if (LP.operator === "gteq" && PP.operator === "lteq") {
        if (pp >= lp)
            label = "Partially supportive of/opposing to";
        else
            label = "Cannot be labelled";
    } else if ((LP.operator === "gt" || LP.operator === "gteq") && (PP.operator === "lt" || PP.operator === "lteq")) {
        if (pp > lp)
            label = "Partially supportive of/opposing to";
        else
            label = "Cannot be labelled";
    } else if (LP.operator === "lteq" && PP.operator === "gteq") {
        if (pp <= lp)
            label = "Partially supportive of/opposing to";
        else
            label = "Cannot be labelled";
    } else if ((LP.operator === "lt" || LP.operator === "lteq") && (PP.operator === "gt" || PP.operator === "gteq")) {
        if (pp < lp)
            label = "Partially supportive of/opposing to";
        else
            label = "Cannot be labelled";
    } else if (LP.operator === "eq" && PP.operator === "neq") {
        if (pp !== lp)
            label = "Supportive";
        else
            label = "Cannot be labelled";
    } else if (PP.operator === "eq" && LP.operator === "neq") {
        if (pp !== lp)
            label = "Opposing";
        else
            label = "Cannot be labelled";
    }
    return label;
};

  
export const comparePayAmount = (LP, PP) => {
    let label = "";
    const pp = parseInt(PP.rightOperand);
    const lp = parseInt(LP.rightOperand);

    if ((LP.operator === "gt" || LP.operator === "gteq") && (PP.operator === "gt" || PP.operator === "gteq")) {
        if (lp === pp) {
            label = "Neutral";
        } else if (pp > lp) {
            label = "Opposing";
        } else if (pp < lp) {
            label = "Supportive";
        }
    } else if ((LP.operator === "lt" || LP.operator === "lteq") && (PP.operator === "lt" || PP.operator === "lteq")) {
        if (lp === pp) {
            label = "Neutral";
        } else if (pp > lp) {
            label = "Supportive";
        } else if (pp < lp) {
            label = "Opposing";
        }
    } else if (LP.operator === "ep" && PP.operator === "eq") {
        if (pp === lp)
            label = "Neutral";
        else
            label = "Cannot be labelled";
    } else if (LP.operator === "gt" && PP.operator === "eq") {
        if (pp > lp)
            label = "Opposing";
        else
            label = "Cannot be labelled";
    } else if (LP.operator === "gteq" && PP.operator === "eq") {
        if (pp >= lp)
            label = "Opposing";
        else
            label = "Cannot be labelled";
    } else if (PP.operator === "gt" && LP.operator === "eq") {
        if (pp < lp)
            label = "Supportive";
        else
            label = "Cannot be labelled";
    } else if (PP.operator === "gteq" && LP.operator === "eq") {
        if (pp <= lp)
            label = "Supportive";
        else
            label = "Cannot be labelled";
    } else if (LP.operator === "lt" && PP.operator === "eq") {
        if (pp < lp)
            label = "Opposing";
        else
            label = "Cannot be labelled";
    } else if (LP.operator === "lteq" && PP.operator === "eq") {
        if (pp <= lp)
            label = "Opposing";
        else
            label = "Cannot be labelled";
    } else if (PP.operator === "lt" && LP.operator === "eq") {
        if (pp > lp)
            label = "Supportive";
        else
            label = "Cannot be labelled";
    } else if (PP.operator === "lteq" && LP.operator === "eq") {
        if (pp >= lp)
            label = "Supportive";
        else
            label = "Cannot be labelled";
    } else if (LP.operator === "nep" && PP.operator === "neq") {
        label = "Neutral";
    } else if (LP.operator === "gteq" && PP.operator === "lteq") {
        if (pp >= lp)
            label = "Partially supportive of/opposing to";
        else
            label = "Cannot be labelled";
    } else if ((LP.operator === "gt" || LP.operator === "gteq") && (PP.operator === "lt" || PP.operator === "lteq")) {
        if (pp > lp)
            label = "Partially supportive of/opposing to";
        else
            label = "Cannot be labelled";
    } else if (LP.operator === "lteq" && PP.operator === "gteq") {
        if (pp <= lp)
            label = "Partially supportive of/opposing to";
        else
            label = "Cannot be labelled";
    } else if ((LP.operator === "lt" || LP.operator === "lteq") && (PP.operator === "gt" || PP.operator === "gteq")) {
        if (pp < lp)
            label = "Partially supportive of/opposing to";
        else
            label = "Cannot be labelled";
    } else if (LP.operator === "eq" && PP.operator === "neq") {
        if (pp !== lp)
            label = "Supportive";
        else
            label = "Cannot be labelled";
    } else if (PP.operator === "eq" && LP.operator === "neq") {
        if (pp !== lp)
            label = "Opposing";
        else
            label = "Cannot be labelled";
    }

    return label;
};

  
export const compareDateTime = (LP, PP) => {
    let label = "";
    const pp = new Date(PP.rightOperand);
    const lp = new Date(LP.rightOperand);

    if ((LP.operator === "gt" || LP.operator === "gteq") && (PP.operator === "gt" || PP.operator === "gteq")) {
        if (lp.getTime() === pp.getTime()) {
            label = "Neutral";
        } else if (pp > lp) {
            label = "Opposing";
        } else if (pp < lp) {
            label = "Supportive";
        }
    } else if ((LP.operator === "lt" || LP.operator === "lteq") && (PP.operator === "lt" || PP.operator === "lteq")) {
        if (lp.getTime() === pp.getTime()) {
            label = "Neutral";
        } else if (pp > lp) {
            label = "Supportive";
        } else if (pp < lp) {
            label = "Opposing";
        }
    } else if (LP.operator === "ep" && PP.operator === "eq") {
        if (pp.getTime() === lp.getTime()) {
            label = "Neutral";
        } else {
            label = "Cannot be labelled";
        }
    } else if (LP.operator === "gt" && PP.operator === "eq") {
        if (pp > lp) {
            label = "Opposing";
        } else {
            label = "Cannot be labelled";
        }
    } else if (LP.operator === "gteq" && PP.operator === "eq") {
        if (pp >= lp) {
            label = "Opposing";
        } else {
            label = "Cannot be labelled";
        }
    } else if (PP.operator === "gt" && LP.operator === "eq") {
        if (pp < lp) {
            label = "Supportive";
        } else {
            label = "Cannot be labelled";
        }
    } else if (PP.operator === "gteq" && LP.operator === "eq") {
        if (pp <= lp) {
            label = "Supportive";
        } else {
            label = "Cannot be labelled";
        }
    } else if (LP.operator === "lt" && PP.operator === "eq") {
        if (pp < lp) {
            label = "Opposing";
        } else {
            label = "Cannot be labelled";
        }
    } else if (LP.operator === "lteq" && PP.operator === "eq") {
        if (pp <= lp) {
            label = "Opposing";
        } else {
            label = "Cannot be labelled";
        }
    } else if (PP.operator === "lt" && LP.operator === "eq") {
        if (pp > lp) {
            label = "Supportive";
        } else {
            label = "Cannot be labelled";
        }
    } else if (PP.operator === "lteq" && LP.operator === "eq") {
        if (pp >= lp) {
            label = "Supportive";
        } else {
            label = "Cannot be labelled";
        }
    } else if (LP.operator === "nep" && PP.operator === "neq") {
        label = "Neutral";
    } else if (LP.operator === "gteq" && PP.operator === "lteq") {
        if (pp >= lp) {
            label = "Partially supportive of/opposing to";
        } else {
            label = "Cannot be labelled";
        }
    } else if ((LP.operator === "gt" || LP.operator === "gteq") && (PP.operator === "lt" || PP.operator === "lteq")) {
        if (pp > lp) {
            label = "Partially supportive of/opposing to";
        } else {
            label = "Cannot be labelled";
        }
    } else if (LP.operator === "lteq" && PP.operator === "gteq") {
        if (pp <= lp) {
            label = "Partially supportive of/opposing to";
        } else {
            label = "Cannot be labelled";
        }
    } else if ((LP.operator === "lt" || LP.operator === "lteq") && (PP.operator === "gt" || PP.operator === "gteq")) {
        if (pp < lp) {
            label = "Partially supportive of/opposing to";
        } else {
            label = "Cannot be labelled";
        }
    } else if (LP.operator === "eq" && PP.operator === "neq") {
        if (pp.getTime() !== lp.getTime()) {
            label = "Supportive";
        } else {
            label = "Cannot be labelled";
        }
    } else if (PP.operator === "eq" && LP.operator === "neq") {
        if (pp.getTime() !== lp.getTime()) {
            label = "Opposing";
        } else {
            label = "Cannot be labelled";
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

    const lp = { start: blp, end: elp };
    const pp = { start: bpp, end: epp };

    if (lp.start.getTime() === pp.start.getTime() && lp.end.getTime() === pp.end.getTime()) {
        label = "Neutral";
    } else if (elp <= bpp || elp.getTime() === bpp.getTime() || epp <= blp || epp.getTime() === blp.getTime()) {
        label = "Cannot be labelled";
    } else if (bpp <= blp && epp >= elp) {
        label = "Supportive";
    } else if (blp <= bpp && elp >= epp) {
        label = "Opposing";
    } else if (blp.getTime() === bpp.getTime() && elp < epp) {
        label = "Supportive";
    } else if (blp.getTime() === bpp.getTime() && epp < elp) {
        label = "Opposing";
    } else if (elp.getTime() === epp.getTime() && blp > bpp) {
        label = "Supportive";
    } else if (elp.getTime() === epp.getTime() && blp < bpp) {
        label = "Opposing";
    } else if ((blp < epp && elp > bpp) || (bpp < elp && epp > blp)) {
        label = "Partially supportive of/opposing to";
    }

    return label;
};

export const compareSpatial = async (LP, PP) => {
    let label = "";

    try {
        const dataLP = await getGeodata(LP.rightOperand);
        const dataPP = await getGeodata(PP.rightOperand);

        const iscountryLP = dataLP.fcodeName === "independent political entity";
        const iscountryPP = dataPP.fcodeName === "independent political entity";

        if (LP.rightOperand === PP.rightOperand) {
            label = "Neutral";
        } else if (iscountryLP && iscountryPP) {
            label = "Cannot be labelled";
        } else if (iscountryLP) {
            if (dataPP.countryName === LP.rightOperand) {
                label = "Opposing";
            } else {
                label = "Cannot be labelled";
            }
        } else if (iscountryPP) {
            if (dataLP.countryName === PP.rightOperand) {
                label = "Supportive";
            } else {
                label = "Cannot be labelled";
            }
        } else {
            if (dataLP.name === dataPP.name) {
                label = "Neutral";
            } else {
                label = "Cannot be labelled";
            }
        }
    } catch (error) {
        console.error("Error fetching geodata:", error);
        label = "Cannot be labelled";
    }

    return label;
};

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


