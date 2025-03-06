import 'package:flutter/material.dart';

class Navbar extends StatelessWidget implements PreferredSizeWidget {
  const Navbar({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: Colors.blue[900],
      toolbarHeight: 100,
      leading: IconButton(
        icon: Icon(Icons.menu, color: Colors.white),
        iconSize: 35,
        onPressed: () {
          Scaffold.of(context).openDrawer();
        },
      ),
      title: Center(
        child: GestureDetector(
          onTap: () {
            Navigator.pushNamed(context, '/');
          },
          child: Image.asset('assets/img/logo3.png', height: 100),
        ),
      ),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(100);
}
