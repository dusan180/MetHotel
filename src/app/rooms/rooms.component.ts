import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Room {
  idsobe: number;
  nazivsobe: string;
  kapacitetsobe: number;
  cenasobe: number;
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = []; 
  newRoom: Room = { idsobe: 0, nazivsobe: '', kapacitetsobe: 0, cenasobe: 0 };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Room[]>('http://localhost:3000/rooms')
      .subscribe((data: Room[]) => {
        this.rooms = data;
      });
  }

  dodajSobu() {
    this.http.post<Room>('http://localhost:3000/rooms', this.newRoom)
      .subscribe((data: Room) => {
        this.rooms.push(data);
        this.newRoom = { idsobe: 0, nazivsobe: '', kapacitetsobe: 0, cenasobe: 0 };
      });
  }
}
