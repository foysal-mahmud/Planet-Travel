<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.w3.org/1999/xhtml">
<head>

<style>

.titleName {
    color: blue;
}

.approvedColor {
    color: green;
}

.declineColor {
    color: red;
}

table {
	font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
	border-collapse: collapse;
	width: 100%;
}

th, td {
	border: 2px solid #ddd;
	padding: 8px;
}

th {
	padding-top: 12px;
	padding-bottom: 12px;
	text-align: left;
	background-color: teal;
	color: white;
}

tr:hover {
	background-color: #ddd;
}

tr:nth-child(even) {
	background-color: #f2f2f2;
}
</style>

</head>
<body>
	<h3>
		Dear <span class="titleName">{{$detailsReservation['fullName']}}</span>,
	</h3>
	<p>Thank you for Tour Package Reservation from Planet Travel.</p>

    @if($detailsReservation['reservation_status'] =='Approved')         
        <h1> Reservation Status: <span class="approvedColor"> {{$detailsReservation['reservation_status']}}</span></h1>        
    @else
        <h1> Reservation Status: <span class="declineColor"> {{$detailsReservation['reservation_status']}}</span></h1>        
    @endif


	<h4>
		Reservation Details:
	</h4>

	<table>
		<tr>
			<th>Your Information</th>
			<th>Billing Address</th>
			<th>Credit Card Information</th>
		</tr>
		<tr>
			<td>
				<h4>Name: {{$detailsReservation['fullName']}} </h4>
                <h4>Email: {{$detailsReservation['email']}} </h4>
                <h4>Mobile Number: {{$detailsReservation['mobile_number']}} </h4>
                <h4>Package Name: <span class="titleName">{{$detailsReservation['packageTitle']}}</span></h4>
                <h4>Tour Date: {{$detailsReservation['tourDate']}}</h4>
			</td>
			<td>
                <h4>Billing Name: {{$detailsReservation['billingName']}} </h4>
                <h4>Billing Address: {{$detailsReservation['billingAddress']}} </h4>
                <h4>Division: {{$detailsReservation['billingDivision']}} </h4>
                <h4>City: {{$detailsReservation['billingCity']}} </h4>
                <h4>Zip Code: {{$detailsReservation['billingZip']}} </h4>
            </td>
			<td>
                <h4>Card Type: {{$detailsReservation['card_type']}} </h4>
                <h4>Card Holder Name: {{$detailsReservation['cardHolder_name']}} </h4>
                <h4>Card Number: {{$detailsReservation['card_number']}} </h4>
                <h4>Card Expiration Month: {{$detailsReservation['card_expiration_month']}} </h4>
                <h4>Card Expiration Year: {{$detailsReservation['card_expiration_year']}} </h4>
			</td>
		</tr>
	</table>

	<p>From,</p>
	<h2>Planet Travel</h2>
</body>
</html>