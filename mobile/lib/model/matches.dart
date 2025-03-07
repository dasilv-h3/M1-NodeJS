class Matches{
  String? score; 
  String? team_name; 
  String? section_name; 
  String? date;

  Matches({required this.score, required this.team_name, required this.section_name, required this.date}); 

   // Méthode pour convertir un JSON en un objet News
  factory Matches.fromJson(Map<String, dynamic> json) {
    return Matches(
      score: json['score'],
      team_name: json['team_name'],
      section_name: json['section_name'],
      date: json['date'],
    );
  }

  // Méthode pour convertir un objet News en JSON
  Map<String, dynamic> toJson() {
    return {
      'score': score,
      'team_name': team_name,
      'section_name': section_name,
      'date': date,
    };
  }

}