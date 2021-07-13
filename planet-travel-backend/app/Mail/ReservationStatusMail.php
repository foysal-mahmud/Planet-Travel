<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReservationStatusMail extends Mailable
{
    use Queueable, SerializesModels;

    public $detailsReservation;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($detailsReservation)
    {
        //
        $this->detailsReservation= $detailsReservation;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject("Tour Package Reservation Status")->view('mailReservation');
    }
}
