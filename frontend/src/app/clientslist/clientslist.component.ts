import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientcardComponent } from '../clientcard/clientcard.component';
import { ClientModel } from '../../models/client.model';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'melApp-clientslist',
  imports: [ClientcardComponent, RouterModule],
  templateUrl: './clientslist.component.html',
  styleUrl: './clientslist.component.css',
})
export class ClientslistComponent implements OnInit {
  clients!: ClientModel[];

  constructor(private readonly clientsService: ClientsService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getClients().subscribe({
      next: (response) => {
        this.clients = response.payload;
      },
      error: (err) => {
        console.error('Error recuperando clientes', err);
      },
    });
  }
}
