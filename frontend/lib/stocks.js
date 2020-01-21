import('dotenv').config();

var stocks = ["MMM#ABT#ABBV#ABMD#ACN#ATVI#ADBE#AMD#AAP#AES#AMG#AFL#A#APD#AKAM#ALK#ALB#ARE#ALXN", "ALGN#ALLE#AGN#ADS#LNT#ALL#GOOGL#GOOG#MO#AMZN#AMCR#AEE#AAL#AEP#AXP#AIG#AMT#AWK#AMP", "ABC#AME#AMGN#APH#ADI#ANSS#ANTM#AON#AOS#APA#AIV#AAPL#AMAT#APTV#ADM#ARNC#ANET#AJG#AIZ", "ATO#T#ADSK#ADP#AZO#AVB#AVY#BHGE#BLL#BAC#BK#BAX#BBT#BDX#BRK.B#BBY#BIIB#BLK#HRB", "BA#BKNG#BWA#BXP#BSX#BMY#AVGO#BR#BF.B#CHRW#COG#CDNS#CPB#COF#CPRI#CAH#KMX#CCL#CAT", "CBOE#CBRE#CBS#CDW#CE#CELG#CNC#CNP#CTL#CERN#CF#SCHW#CHTR#CVX#CMG#CB#CHD#CI#XEC", "CINF#CTAS#CSCO#C#CFG#CTXS#CLX#CME#CMS#KO#CTSH#CL#CMCSA#CMA#CAG#CXO#COP#ED#STZ", "COO#CPRT#GLW#CTVA#COST#COTY#CCI#CSX#CMI#CVS#DHI#DHR#DRI#DVA#DE#DAL#XRAY#DVN#FANG", "DLR#DFS#DISCA#DISCK#DISH#DG#DLTR#D#DOV#DOW#DTE#DUK#DRE#DD#DXC#ETFC#EMN#ETN#EBAY", "ECL#EIX#EW#EA#EMR#ETR#EOG#EFX#EQIX#EQR#ESS#EL#EVRG#ES#RE#EXC#EXPE#EXPD#EXR", "XOM#FFIV#FB#FAST#FRT#FDX#FIS#FITB#FE#FRC#FISV#FLT#FLIR#FLS#FMC#F#FTNT#FTV#FBHS", "FOXA#FOX#BEN#FCX#GPS#GRMN#IT#GD#GE#GIS#GM#GPC#GILD#GL#GPN#GS#GWW#HAL#HBI", "HOG#HIG#HAS#HCA#HCP#HP#HSIC#HSY#HES#HPE#HLT#HFC#HOLX#HD#HON#HRL#HST#HPQ#HUM", "HBAN#HII#IEX#IDXX#INFO#ITW#ILMN#IR#INTC#ICE#IBM#INCY#IP#IPG#IFF#INTU#ISRG#IVZ#IPGP", "IQV#IRM#JKHY#JEC#JBHT#SJM#JNJ#JCI#JPM#JNPR#KSU#K#KEY#KEYS#KMB#KIM#KMI#KLAC#KSS", "KHC#KR#LB#LHX#LH#LRCX#LW#LEG#LDOS#LEN#LLY#LNC#LIN#LKQ#LMT#L#LOW#LYB#MTB", "MAC#M#MRO#MPC#MKTX#MAR#MMC#MLM#MAS#MA#MKC#MXIM#MCD#MCK#MDT#MRK#MET#MTD#MGM", "MCHP#MU#MSFT#MAA#MHK#TAP#MDLZ#MNST#MCO#MS#MOS#MSI#MSCI#MYL#NDAQ#NOV#NKTR#NTAP#NFLX", "NWL#NEM#NWSA#NWS#NEE#NLSN#NKE#NI#NBL#JWN#NSC#NTRS#NOC#NCLH#NRG#NUE#NVDA#NVR#ORLY", "OXY#OMC#OKE#ORCL#PCAR#PKG#PH#PAYX#PYPL#PNR#PBCT#PEP#PKI#PRGO#PFE#PM#PSX#PNW#PXD", "PNC#PPG#PPL#PFG#PG#PGR#PLD#PRU#PEG#PSA#PHM#PVH#QRVO#PWR#QCOM#DGX#RL#RJF#RTN", "O#REG#REGN#RF#RSG#RMD#RHI#ROK#ROL#ROP#ROST#RCL#CRM#SBAC#SLB#STX#SEE#SRE#SHW", "SPG#SWKS#SLG#SNA#SO#LUV#SPGI#SWK#SBUX#STT#SYK#STI#SIVB#SYMC#SYF#SNPS#SYY#TMUS#TROW", "TTWO#TPR#TGT#TEL#FTI#TFX#TXN#TXT#TMO#TIF#TWTR#TJX#TSCO#TDG#TRV#TRIP#TSN#UDR#ULTA", "USB#UAA#UA#UNP#UAL#UNH#UPS#URI#UTX#UHS#UNM#VFC#VLO#VAR#VTR#VRSN#VRSK#VZ#VRTX", "VIAB#V#VNO#VMC#WAB#WMT#WBA#DIS#WM#WAT#WEC#WCG#WFC#WELL#WDC#WU#WRK#WY#WHR", "WMB#WLTW#WYNN#XEL#XRX#XLNX#XYL#YUM#ZBH#ZION#ZTS"]
var names = ["3M Company#Abbott Laboratories#AbbVie Inc.#ABIOMED Inc#Accenture plc#Activision Blizzard#Adobe Systems Inc#Advanced Micro Devices Inc#Advance Auto Parts#AES Corp#Affiliated Managers Group Inc#AFLAC Inc#Agilent Technologies Inc#Air Products & Chemicals Inc#Akamai Technologies Inc#Alaska Air Group Inc#Albemarle Corp#Alexandria Real Estate Equities#Alexion Pharmaceuticals", "Align Technology#Allegion#Allergan, Plc#Alliance Data Systems#Alliant Energy Corp#Allstate Corp#Alphabet Inc Class A#Alphabet Inc Class C#Altria Group Inc#Amazon.com Inc.#Amcor plc#Ameren Corp#American Airlines Group#American Electric Power#American Express Co#American International Group#American Tower Corp.#American Water Works Company Inc#Ameriprise Financial", "AmerisourceBergen Corp#AMETEK Inc.#Amgen Inc.#Amphenol Corp#Analog Devices, Inc.#ANSYS#Anthem#Aon plc#A.O. Smith Corp#Apache Corporation#Apartment Investment & Management#Apple Inc.#Applied Materials Inc.#Aptiv Plc#Archer-Daniels-Midland Co#Arconic Inc.#Arista Networks#Arthur J. Gallagher & Co.#Assurant", "Atmos Energy Corp#AT&T Inc.#Autodesk Inc.#Automatic Data Processing#AutoZone Inc#AvalonBay Communities, Inc.#Avery Dennison Corp#Baker Hughes, a GE Company#Ball Corp#Bank of America Corp#The Bank of New York Mellon Corp.#Baxter International Inc.#BB&T Corporation#Becton Dickinson#Berkshire Hathaway#Best Buy Co. Inc.#Biogen Inc.#BlackRock#Block H&R", "Boeing Company#Booking Holdings Inc#BorgWarner#Boston Properties#Boston Scientific#Bristol-Myers Squibb#Broadcom Inc.#Broadridge Financial Solutions#Brown-Forman Corp.#C. H. Robinson Worldwide#Cabot Oil & Gas#Cadence Design Systems#Campbell Soup#Capital One Financial#Capri Holdings#Cardinal Health Inc.#Carmax Inc#Carnival Corp.#Caterpillar Inc.", "Cboe Global Markets#CBRE Group#CBS Corp.#CDW#Celanese#Celgene Corp.#Centene Corporation#CenterPoint Energy#CenturyLink Inc#Cerner#CF Industries Holdings Inc#Charles Schwab Corporation#Charter Communications#Chevron Corp.#Chipotle Mexican Grill#Chubb Limited#Church & Dwight#CIGNA Corp.#Cimarex Energy", "Cincinnati Financial#Cintas Corporation#Cisco Systems#Citigroup Inc.#Citizens Financial Group#Citrix Systems#The Clorox Company#CME Group Inc.#CMS Energy#Coca-Cola Company#Cognizant Technology Solutions#Colgate-Palmolive#Comcast Corp.#Comerica Inc.#Conagra Brands#Concho Resources#ConocoPhillips#Consolidated Edison#Constellation Brands", "The Cooper Companies#Copart Inc#Corning Inc.#Corteva#Costco Wholesale Corp.#Coty, Inc#Crown Castle International Corp.#CSX Corp.#Cummins Inc.#CVS Health#D. R. Horton#Danaher Corp.#Darden Restaurants#DaVita Inc.#Deere & Co.#Delta Air Lines Inc.#Dentsply Sirona#Devon Energy#Diamondback Energy", "Digital Realty Trust Inc#Discover Financial Services#Discovery Inc. Class A#Discovery Inc. Class C#Dish Network#Dollar General#Dollar Tree#Dominion Energy#Dover Corp.#Dow Inc.#DTE Energy Co.#Duke Energy#Duke Realty Corp#DuPont de Nemours Inc#DXC Technology#E*Trade#Eastman Chemical#Eaton Corporation#eBay Inc.", "Ecolab Inc.#Edison Int'l#Edwards Lifesciences#Electronic Arts#Emerson Electric Company#Entergy Corp.#EOG Resources#Equifax Inc.#Equinix#Equity Residential#Essex Property Trust, Inc.#Estee Lauder Cos.#Evergy#Eversource Energy#Everest Re Group Ltd.#Exelon Corp.#Expedia Group#Expeditors#Extra Space Storage", "Exxon Mobil Corp.#F5 Networks#Facebook, Inc.#Fastenal Co#Federal Realty Investment Trust#FedEx Corporation#Fidelity National Information Services#Fifth Third Bancorp#FirstEnergy Corp#First Republic Bank#Fiserv Inc#FleetCor Technologies Inc#FLIR Systems#Flowserve Corporation#FMC Corporation#Ford Motor#Fortinet#Fortive Corp#Fortune Brands Home & Security", "Fox Corporation Class A#Fox Corporation Class B#Franklin Resources#Freeport-McMoRan Inc.#Gap Inc.#Garmin Ltd.#Gartner Inc#General Dynamics#General Electric#General Mills#General Motors#Genuine Parts#Gilead Sciences#Globe Life Inc.#Global Payments Inc.#Goldman Sachs Group#Grainger (W.W.) Inc.#Halliburton Co.#Hanesbrands Inc",  "Harley-Davidson#Hartford Financial Svc.Gp.#Hasbro Inc.#HCA Healthcare#HCP Inc.#Helmerich & Payne#Henry Schein#The Hershey Company#Hess Corporation#Hewlett Packard Enterprise#Hilton Worldwide Holdings Inc#HollyFrontier Corp#Hologic#Home Depot#Honeywell Int'l Inc.#Hormel Foods Corp.#Host Hotels & Resorts#HP Inc.#Humana Inc.", "Huntington Bancshares#Huntington Ingalls Industries#IDEX Corporation#IDEXX Laboratories#IHS Markit Ltd.#Illinois Tool Works#Illumina Inc#Ingersoll-Rand PLC#Intel Corp.#Intercontinental Exchange#International Business Machines#Incyte#International Paper#Interpublic Group#Intl Flavors & Fragrances#Intuit Inc.#Intuitive Surgical Inc.#Invesco Ltd.#IPG Photonics Corp.", "IQVIA Holdings Inc.#Iron Mountain Incorporated#Jack Henry & Associates#Jacobs Engineering Group#J. B. Hunt Transport Services#JM Smucker#Johnson & Johnson#Johnson Controls International#JPMorgan Chase & Co.#Juniper Networks#Kansas City Southern#Kellogg Co.#KeyCorp#Keysight Technologies#Kimberly-Clark#Kimco Realty#Kinder Morgan#KLA Corporation#Kohl's Corp.", "Kraft Heinz Co#Kroger Co.#L Brands Inc.#L3Harris Technologies#Laboratory Corp. of America Holding#Lam Research#Lamb Weston Holdings Inc#Leggett & Platt#Leidos Holdings#Lennar Corp.#Lilly (Eli) & Co.#Lincoln National#Linde plc#LKQ Corporation#Lockheed Martin Corp.#Loews Corp.#Lowe's Cos.#LyondellBasell#M&T Bank Corp.", "Macerich#Macy's Inc.#Marathon Oil Corp.#Marathon Petroleum#MarketAxess#Marriott Int'l.#Marsh & McLennan#Martin Marietta Materials#Masco Corp.#Mastercard Inc.#McCormick & Co.#Maxim Integrated Products Inc#McDonald's Corp.#McKesson Corp.#Medtronic plc#Merck & Co.#MetLife Inc.#Mettler Toledo#MGM Resorts International", "Microchip Technology#Micron Technology#Microsoft Corp.#Mid-America Apartments#Mohawk Industries#Molson Coors Brewing Company#Mondelez International#Monster Beverage#Moody's Corp#Morgan Stanley#The Mosaic Company#Motorola Solutions Inc.#MSCI Inc#Mylan N.V.#Nasdaq, Inc.#National Oilwell Varco Inc.#Nektar Therapeutics#NetApp#Netflix Inc.", "Newell Brands#Newmont Goldcorp#News Corp. Class A#News Corp. Class B#NextEra Energy#Nielsen Holdings#Nike#NiSource Inc.#Noble Energy Inc#Nordstrom#Norfolk Southern Corp.#Northern Trust Corp.#Northrop Grumman#Norwegian Cruise Line Holdings#NRG Energy#Nucor Corp.#Nvidia Corporation#NVR Inc#O'Reilly Automotive", "Occidental Petroleum#Omnicom Group#ONEOK#Oracle Corp.#PACCAR Inc.#Packaging Corporation of America#Parker-Hannifin#Paychex Inc.#PayPal#Pentair plc#People's United Financial#PepsiCo Inc.#PerkinElmer#Perrigo#Pfizer Inc.#Philip Morris International#Phillips 66#Pinnacle West Capital#Pioneer Natural Resources", "PNC Financial Services#PPG Industries#PPL Corp.#Principal Financial Group#Procter & Gamble#Progressive Corp.#Prologis#Prudential Financial#Public Serv. Enterprise Inc.#Public Storage#Pulte Homes Inc.#PVH Corp.#Qorvo#Quanta Services Inc.#QUALCOMM Inc.#Quest Diagnostics#Ralph Lauren Corporation#Raymond James Financial Inc.#Raytheon Co.", "Realty Income Corporation#Regency Centers Corporation#Regeneron Pharmaceuticals#Regions Financial Corp.#Republic Services Inc#ResMed#Robert Half International#Rockwell Automation Inc.#Rollins Inc.#Roper Technologies#Ross Stores#Royal Caribbean Cruises Ltd#Salesforce.com#SBA Communications#Schlumberger Ltd.#Seagate Technology#Sealed Air#Sempra Energy#Sherwin-Williams", "Simon Property Group Inc#Skyworks Solutions#SL Green Realty#Snap-on#Southern Co.#Southwest Airlines#S&P Global, Inc.#Stanley Black & Decker#Starbucks Corp.#State Street Corp.#Stryker Corp.#SunTrust Banks#SVB Financial#Symantec Corp.#Synchrony Financial#Synopsys Inc.#Sysco Corp.#T-Mobile US#T. Rowe Price Group", "Take-Two Interactive#Tapestry, Inc.#Target Corp.#TE Connectivity Ltd.#TechnipFMC#Teleflex#Texas Instruments#Textron Inc.#Thermo Fisher Scientific#Tiffany & Co.#Twitter, Inc.#TJX Companies Inc.#Tractor Supply Company#TransDigm Group#The Travelers Companies Inc.#TripAdvisor#Tyson Foods#UDR, Inc.#Ulta Beauty", "U.S. Bancorp#Under Armour Class A#Under Armour Class C#Union Pacific Corp#United Airlines Holdings#United Health Group Inc.#United Parcel Service#United Rentals, Inc.#United Technologies#Universal Health Services, Inc.#Unum Group#V.F. Corp.#Valero Energy#Varian Medical Systems#Ventas Inc#Verisign Inc.#Verisk Analytics#Verizon Communications#Vertex Pharmaceuticals Inc", "Viacom Inc.#Visa Inc.#Vornado Realty Trust#Vulcan Materials#Wabtec Corporation#Walmart#Walgreens Boots Alliance#The Walt Disney Company#Waste Management Inc.#Waters Corporation#Wec Energy Group Inc#WellCare#Wells Fargo#Welltower Inc.#Western Digital#Western Union Co#WestRock#Weyerhaeuser#Whirlpool Corp.", "Williams Cos.#Willis Towers Watson#Wynn Resorts Ltd#Xcel Energy Inc#Xerox#Xilinx#Xylem Inc.#Yum! Brands Inc#Zimmer Biomet Holdings#Zions Bancorp#Zoetis"];
var joined = [];
var joinedTwenty = [];


function start() {
    let temp = [];
    for (var x = 0; x < stocks.length; x++) {

        stocks[x] = stocks[x].split('#');
        names[x] = names[x].split('#');
        for (var y = 0; y < stocks[x].length; y++) {
            joined.push({symbol: stocks[x][y], name: names[x][y], currentPrice: 0, opening: 0});
            temp.push({symbol: stocks[x][y], name: names[x][y], currentPrice: 0, opening: 0});
            if (temp.length === 20) {
                joinedTwenty.push(temp);
                temp = [];
            }
        }
    }
}

function stockIsTracked(symbol) {
    if (joined.length <= 0) {
        start();
    }
    let output = false;
    if (symbol.split('').length > 6) {
        return false;
    }
    let temp = symbol.toUpperCase();
    for (var x = 0; x < joined.length; x++) {
        if (joined[x].symbol == symbol) {
            return true;
        }
    }


    return output;
};

function find20Grouping(symbol) {
    if (joined.length <= 0) {
        start();
    }

    for (var x = 0; x < stocks.length; x++) {
        if (stocks[x].includes(symbol.toUpperCase())) {
            console.log(stocks[x].join(','));
        }
    }
};

function randomStock() {
    if (joined.length <= 0) {
        start();
    }
    let num = Math.floor(Math.random() * Math.floor(joined.length));
    return joined[num];
}
exports.stocks = stocks;
exports.names = names;
exports.joined = joined;
exports.find20Grouping = find20Grouping;
exports.stockIsTracked = stockIsTracked;
exports.randomStock = randomStock;