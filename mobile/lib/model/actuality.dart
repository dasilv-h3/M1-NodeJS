class Actuality {
  int id;
  String title;
  String resume;
  String description;
  String image;
  String created_at;
  String edit_at;
  int team_id;

  Actuality({
    required this.id,
    required this.title,
    required this.resume,
    required this.description,
    required this.image,
    required this.created_at,
    required this.edit_at,
    required this.team_id,
  });

  factory Actuality.fromJSON(dynamic data) {
    return Actuality(
      id: data['id'],
      title: data['title'],
      resume: data['resume'],
      description: data['description'],
      image: data['image'],
      created_at: data['created_at'],
      edit_at: data['edit_at'],
      team_id: data['team_id'],
    );
  }
}
