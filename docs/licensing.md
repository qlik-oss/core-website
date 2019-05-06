<style>
    .md-sidebar--secondary {
        display: none;
    }
    .md-content {
        margin-right: unset;
    }
    .md-content__icon {
        display: none;
    }
    .cards-pricing {
        border: 2px;
        border-style: solid;        
        margin-top: 10px;
        margin-right: 10px;
        float: left;
        width: calc(33% - 20px);
        min-width: 300px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
    .cards-pricing-free {
        border-color: var(--custom-pricing-color-3);
    }
    .cards-pricing-trial {
        border-color: var(--custom-pricing-color-2);
    }
    .cards-pricing-enterprise {
        border-color: var(--custom-pricing-color-1);
    }
    .cards-pricing h2 {
        padding-top: 30px;
        margin-top: 0px;
        text-align: center;
    }
    .cards-pricing p {
        margin-bottom: 0px;
        padding-bottom: 20px;
    }
    .md-column > ul li { 
        list-style-type: none; 
    }
    .md-column > ul li::before {
        content: "\2022"; 
        color: var(--custom-pricing-color-1);
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;  
    }
    .cards-middle {
        height: 19rem;
        padding: 10px;
        background-color: var(--custom-pricing-color-4);
    }
    .cards-bottom {
        color: #fff;
        font-weight: bold;
        text-align: center;
        transition: 0.3s;
    }
     .cards-bottom p {
        margin-top: 0px;
        padding-top: 20px;
     }
    .cards-header {
        text-align: center;
        color: #fff;
    }
    .card-free {
        background-color: var(--custom-pricing-color-3);
    }
    .card-trial {
        background-color: var(--custom-pricing-color-2);
    }
    .card-enterprise {
        background-color: var(--custom-pricing-color-1);
    }
    .cards-middle p {
        padding-left: 1.4rem;
    }
    .pricing a, .pricing a:hover {
        text-decoration: none;
        color: #fff;
    }
    .pricing:hover {
        text-decoration: none;
        border-bottom: 2px solid #fff;
        cursor: pointer;
    }
</style>
<h1>Pricing</h1>
<p>There are currently three options for using Qlik Core — two for evaluation and one for production. These are outlined below. </p>

<div class="md-row">
    <!-- Free -->
    <div class="cards-pricing cards-pricing-free">
        <div class="cards-header card-free">
            <h2><b>DEVELOPER EDITION</b></h2>
            <p>FREE</p>
        </div>
        <div class="cards-middle">
            <ul>
                <li>5 concurrent session limit</li>
                <li>60-day expiration</li>
                <li>Use to quickly evaluate, develop or test solutions for testing (and not commercial) purposes</li>
            </ul>
        </div>
        <div class="cards-bottom card-free">
            <p><span class="pricing">GET STARTED »</span></p>
        </div>
    </div>
    <!-- Trial -->
    <div class="cards-pricing cards-pricing-trial">      
        <div class="cards-header card-trial">
            <h2><b>TRIAL EDITION</b></h2>
            <p>FREE</p>
        </div>
        <div class="cards-middle">
            <ul>
                <li>No concurrent session limit</li>
                <li>90-day expiration</li>
                <li>Use to evaluate the scalability and load testing abilities for testing (and not commercial) purposes</li>
            </ul>
        </div>
        <div class="cards-bottom card-trial">
            <p><span class="pricing"><a href="/license-registration/">GET A TRIAL »</a></span></p>
        </div>
    </div>
    <!-- Enterprise -->
    <div class="cards-pricing cards-pricing-enterprise">
        <div class="cards-header card-enterprise">
            <h2><b>PRODUCTION EDITION</b></h2>
            <p>STARTS AT <b>$360</b>/YR FOR <b>1,000</b> MINS/MO</p>
        </div>
        <div class="cards-middle">
            <ul>
                <li>Enables an agreed amount of minutes (resets at the end of each applicable period)</li>
                <li>Based on a subscription agreement </li>
                <li>Use to fully unleash Qlik Core in your production projects</li>
            </ul>
            <p>Based on your application and usage patterns, our team can help you build the right model for your implementation.</p>
        </div>
        <div class="cards-bottom card-enterprise">
            <p><span class="pricing"><a>CONTACT US »</a></span></p>
        </div>
    </div>
</div>
<br>



# Licensing Model

Please see our License Metrics for Qlik Core. The following is a summary, which is subject to change:

Qlik Core includes a suite of APIs, License Service and the Qlik Associative Engine (Engine).
Applications may be built using these APIs. The function of the License Service is to unlock the
Engine and collect usage metrics. 

Qlik Core is licensed as an annual subscription for a fixed quantity of minutes per month that may be consumed during each month of the subscription. Minutes are metered in 5 minute increments (called Core Sessions). The license is administered using a License Enabling File (LEF), which limits the maximum number of minutes during which the Engine may operate. 

A Core Session is triggered at the commencement of any kind of connection with the Engine JSON API subject to the following: 

* Each such connection will be assigned a Core Session identifier (called a Session ID) 
* Connections that commence within 5 minutes from the start of an existing Core Session with the same Session ID will not trigger a new Core Session
* Connections which are assigned different Session IDs may each trigger and consume separate Core Sessions

A Connection may include, but is not limited to, a user interface or program-to-program interface. 


There are three options for using Qlik Core — two for evaluation (one of which includes a license)
and one for production. These are detailed below. By downloading and using Qlik Core, you are subject
to the [End-User License Agreement](./eula.md).
Make sure you have read and understood this agreement before continuing.

# Third Party Licenses

Click [here](./third-party-licenses.md) for information about our third-party licenses used in our closed source components.

!!! Note "Disclaimer"
    The information published herein is for informational purposes only and is subject to change at Qlik’s discretion.  Qlik shall not be liable for errors or omissions with respect to this publication and makes no representation or warranty of any kind, other than any express warranties set forth in any applicable agreement.  Nothing herein should be construed as constituting an additional warranty. 