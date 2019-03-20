/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // Enable to debug issues.
        // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
        
        var notificationOpenedCallback = function(jsonData) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        window.plugins.OneSignal
            .startInit("4a64f0cd-b2ef-4038-87e4-98d7ed0ce144")
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();
        
        // Disejbl bek batn
        document.addEventListener("backbutton", function (e) {
            e.preventDefault();
            // Kolaj fankšn za bekanje
            vratiSe();
        }, false );
    }
};

function vratiSe(){
    if(aktivnaStranica=='home'){
        if($(".nav-sidebar").hasClass("active")){
            $(".nav-sidebar").removeClass("active");
            $(".nav-overlay").removeClass("active");
        }else{
            navigator.app.exitApp();
        }        
    }else{       
        home();
    }
    return false;
}
