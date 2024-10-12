<html>
    <body>
        <h2>FOE Room Reservation</h2>

        Dear ${userName},<br>
        Thank you for using FOE Online Room Reservation service<br>

        <br>Your booking has been placed successfully.<br>
        
        <h3>Booking details</h3>
        <div><b>
            <table>
                <tr>
                    <td style="padding: 3px">Booked room</td>
                    <td style="border-left: 2px solid blue; padding: 5px;"> ${roomName}</td>
                </tr>
                <tr>
                    <td style="padding: 3px">Purpose</td>
                    <td style="border-left: 2px solid blue; padding: 5px;"> ${purpose}</td>
                </tr>
                <tr>
                    <td style="padding: 3px">Booked days</td>
                    <td style="border-left: 2px solid blue">
                    	<ul style="list-style-type: none; padding: 0; margin: 0;">
                    		<#list dates as date>
                    			<li style="margin: 5px;">${date}</li>
                    		</#list>
                    	</ul>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 3px">From time</td>
                    <td style="border-left: 2px solid blue; padding: 5px;"> ${startTime}</td>
                </tr>
                <tr>
                    <td style="padding: 3px">To time</td>
                    <td style="border-left: 2px solid blue; padding: 5px;"> ${endTime}</td>
                </tr>
            </table>
        </div></b>
    </body>
</html>