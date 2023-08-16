export default class Information {
  starting_km?: string;
  final_km?: string;
  plate?: string;
  notes?: string;
  date_time_registry?: string;
  //inserir o campo de midia uri

  constructor(
    starting_km?: string,
    final_km?: string,
    plate?: string,
    notes?: string,
    date_time_registry?: string
  ) {
    this.starting_km = starting_km;
    this.final_km = final_km;
    this.plate = plate;
    this.notes = notes;
    this.date_time_registry = date_time_registry;
  }
}
